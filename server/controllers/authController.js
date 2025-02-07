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
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

// GET
const refresh = (req, res, next) => {};

// POST
const logout = (req, res, next) => {};

export { login, refresh, logout };
