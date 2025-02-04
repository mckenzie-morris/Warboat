import Profile from "../models/profile.js";
import bcrypt from "bcrypt";

// GET
const getAllProfiles = async (req, res) => {
  const profiles = await Profile.find({})
  // ? = optional chaining
  if (!profiles?.length) {
    return res.status(400).json({message: 'No profiles found'})
  }
  return res.json(profiles)
}

// GET 🚩🚩🚩🚩🚩🚩
const getProfile = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Both fields required" });
  }

  const query = Profile.where({ username: username, password: password });
  const profile = await query.findOne().lean().exec();
};

// POST
const createNewProfile = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Both fields required" });
  }
  // .lean() returns plain JavaScript objects instead of full Mongoose documents
  // using .exec() with an await gives better strack traces
  const duplicate = await Profile.findOne({ username }).lean().exec();
  if (duplicate) {
    // status 409: conflict; when a request conflicts with the current state of the server
    return res.status(409).json({ message: "username already exists" });
  }
  /* second parameter (10) is number of salt rounds; 
  
  adding salts to hashed passwords defends against rainbow table attacks (precomputed 
  list of common password hashes) and makes brute-force attacks computationally expensive */
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = { username, password: hashedPwd };
  const user = await Profile.create(userObject);
  // .create() returns a promise that resolves to the newly created document (user)
  if (user) {
    return res.status(201).json({ message: "user successfully created" });
  } else {
    return res.status(400).json({ message: "invalid user data received" });
  }
};

// PATCH 🚩🚩🚩🚩🚩🚩
const updateProfileUsername = async (req, res) => {
  const { username, password } = req.body;
};

// PATCH 🚩🚩🚩🚩🚩🚩
const updateProfilePassword = async (req, res) => {
  const { username, password } = req.body;
};

// DELETE 🚩🚩🚩🚩🚩🚩
const deleteProfile = async (req, res) => {

};

export {
  getAllProfiles,
  getProfile,
  createNewProfile,
  updateProfileUsername,
  updateProfilePassword,
  deleteProfile,
};
