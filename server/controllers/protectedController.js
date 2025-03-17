import Profile from "../models/profile.js";

const profile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ username: req.username })
      .lean()
      .exec();
    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }
    delete profile._id;
    delete profile.password;
    delete profile.__v;
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
    }
    else if (newUsername !== confirmedNewUsername) {
      return res.status(400).json({ message: "usernames must match" });
    }

    const duplicate = await Profile.findOne({ username: newUsername })
      .lean()
      .exec();
    if (duplicate) {
      // status 409: conflict; when a request conflicts with the current state of the server
      return res.status(409).json({ message: "username already exists" });
    }


    const profile = await Profile.findOne({ username: req.username })
      .lean()
      .exec();
    return res.status(200).json({ message: "ayyyyyyyyyy 🍻🍻🍻" });
  } 
  catch (error) {
    return next(error);
  }
};

export { profile, changeUsername };
