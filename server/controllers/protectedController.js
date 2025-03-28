import Profile from "../models/profile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const profile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ username: req.username })
      .select("-_id -__v")
      .lean()
      .exec();
    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    return next(error);
  }
};

const changeUsername = async (req, res, next) => {
  try {
    const { newUsername, confirmedNewUsername, submittedPassword } = req.body;
    if (!newUsername || !confirmedNewUsername || !submittedPassword) {
      return res.status(400).json({ message: "all fields required" });
    } else if (newUsername !== confirmedNewUsername) {
      return res.status(400).json({ message: "usernames must match" });
    }

    const duplicate = await Profile.findOne({ username: newUsername })
      .lean()
      .exec();
    if (duplicate) {
      // status 409: conflict; when a request conflicts with the current state of the server
      return res.status(409).json({ message: "username already exists" });
    }

    const profile = await Profile.findOneAndUpdate(
      // filter
      { username: req.username },
      // update
      { username: newUsername },
      // options
      {
        new: true,
        lean: true,
        fields: "username highestScore mostRecentScore acctCreated",
      },
    );
    console.log("updated profile ✅\n", profile);
    // clear refresh token with outdated username
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });

    // instantiate a new jwt access token
    const accessToken = jwt.sign(
      // payload
      {
        Profile: { username: profile.username },
      },
      // secret key
      process.env.ACCESS_TOKEN_SECRET,

      { expiresIn: "10s" },
    );
    // instantiate a new jwt refresh token
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

    return res.status(200).json([{ accessToken }, profile.username]);
  } catch (error) {
    return next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmedNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmedNewPassword) {
      return res.status(400).json({ message: "all fields required" });
    } else if (newPassword !== confirmedNewPassword) {
      return res.status(400).json({ message: "passwords must match" });
    }

    const profile = await Profile.findOne({ username: req.username })
      .select("+password")
      .lean()
      .exec();
    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, profile.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password incorrect" });
    }
    delete profile.password;

    const hashedPwd = await bcrypt.hash(newPassword, 10);

    const updatedProfile = await Profile.findOneAndUpdate(
      // filter
      { username: profile.username },
      // update
      { password: hashedPwd },
      // options
      {
        new: true,
        lean: true,
        fields: "username highestScore mostRecentScore acctCreated",
      },
    );
    console.log("updated profile ✅\n", updatedProfile);
    // instantiate a new jwt access token
    const accessToken = jwt.sign(
      // payload
      {
        Profile: { username: updatedProfile.username },
      },
      // secret key
      process.env.ACCESS_TOKEN_SECRET,

      { expiresIn: "10s" },
    );
    return res.status(200).json([{ accessToken }, updatedProfile.username]);
  } catch (error) {
    return next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const { submittedUsername, submittedPassword } = req.body;

    if (!submittedUsername || !submittedPassword) {
      return res.status(400).json({ message: "both fields required" });
    }
    const profile = await Profile.findOne({ username: submittedUsername })
      .select("+password")
      .lean()
      .exec();
    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }
    // compare submitted password to profile's password from database
    const isMatch = await bcrypt.compare(submittedPassword, profile.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password incorrect" });
    }
    // if submitted password matches db password, execute delete function (delete from db)
    const deletedProfile = await Profile.findByIdAndDelete(profile._id);
    console.log("profile deleted ❌\n", deletedProfile);
    return res
      .status(200)
      .json({ message: `${submittedUsername} successfully deleted` });
  } catch (error) {
    return next(error);
  }
};

export { profile, changeUsername, changePassword, deleteProfile };
