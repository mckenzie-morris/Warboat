import Profile from "../models/profile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// POST
const login = async (req, res, next) => {
  try {
    const { submittedUsername, submittedPassword } = req.body;
    if (!submittedUsername || !submittedPassword) {
      return res.status(400).json({ message: "both fields required" });
    }

    const profile = await Profile.findOne({ username: submittedUsername })
      .lean()
      .exec();
    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }
    console.log("profile found ✅\n", profile);

    const isMatch = await bcrypt.compare(submittedPassword, profile.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password incorrect" });
    }
    // instantiate a jwt access token after successfully logging-in
    const accessToken = jwt.sign(
      // payload
      {
        Profile: { username: profile.username },
      },
      // secret key
      process.env.ACCESS_TOKEN_SECRET,
      // options (algorithm: defaults to HS256 if not specified)
      { expiresIn: "1m" },
    );
    // instantiate a jwt refresh token after successfully logging-in
    const refreshToken = jwt.sign(
      {
        Profile: { username: profile.username },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );
    // attach refresh token to HTTP-only cookie (.cookie() from Express)
    res.cookie("jwt", refreshToken, {
      /* must be set to true so that client-side JavaScript cannot effect any 
      change to the cookie through the Document.cookie property */
      httpOnly: true,
      // if sameSite is set to 'none', secure must be set to 'true'
      secure: true,
      /* must be 'none' in development (webpack runs on one origin and Express 
      server on another) */
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // send access token as part of response
    return res.status(200).json([{accessToken}, profile.username]);
  } catch (error) {
    return next(error);
  }
};

// GET
const refresh = (req, res, next) => {
  const cookies = req.cookies;
  // ? = optional chaining
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const refreshToken = cookies.jwt;
  // decode and validate refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (error, decoded) => {
      try {
        // if the refresh token is invalid (expired, invalid signature, etc.)
        if (error) {
          return res.status(403).json({ message: "forbidden" });
        }

        const profile = await Profile.findOne({ username: decoded.Profile.username })
          .lean()
          .exec();

        if (!profile) return res.status(401).json({ message: "Unauthorized" });
        // instantiate a jwt access token after successfully validating refresh token
        const accessToken = jwt.sign(
          {
            Profile: { username: profile.username },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1m" },
        );
        // send access token as part of response
        return res.json({ accessToken });
      } catch (error) {
        return next(error);
      }
    },
  );
};

// POST
const logout = (req, res, next) => {
  const cookies = req.cookies;
  // if refresh token has already been cleared from cookie, no further action needed
  // console.log(req)
  console.log(cookies)
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  // clear refresh token on cookie (.clearCookie() from Express)
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  res.json({ message: "Cookie cleared" });
};

export { login, refresh, logout };
