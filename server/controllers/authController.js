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

    const accessToken = jwt.sign(
      {
        User: { username: profile.username },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" },
    );

    const refreshToken = jwt.sign(
      {
        User: { username: profile.username },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("jwt", refreshToken, {
      // must be set to true so that client-side JavaScript cannot effect any change to the cookie
      httpOnly: true,
      // must be 'false' in development (since localhost does not have a secure protocol)
      secure: true,
      // must be 'none' in development (webpack runs on one origin and Express server on another)
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

// GET
const refresh = (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.status(401).json({ message: "password incorrect" });
    }
    const refreshToken = cookies.jwt
  } 
  catch (error) {

  }
};

// POST
const logout = (req, res, next) => {};

export { login, refresh, logout };
