import Profile from "../models/profile.js";

const profile = async (req, res, next) => {
  console.log("😁😁😁", req.username);
  const profile = await Profile.findOne({ username: req.username })
    .lean()
    .exec();
  if (!profile) {
    return res.status(404).json({ message: "profile not found" });
  }
  delete profile._id
  delete profile.password
  delete profile.__v
  return res.status(200).json(profile);
};

export { profile };
