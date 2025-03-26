import Profile from "../models/profile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAllProfiles = async (req, res, next) => {
  try {
    // .lean() returns plain JavaScript objects instead of full Mongoose documents
    // using .exec() with an await gives better strack traces
    const profiles = await Profile.find({})
      .lean()
      .exec();
    // if no profiles are found, return 404
    if (!profiles.length) {
      return res.status(404).json({ message: "No profiles found" });
    }
    // return found profiles
    return res.status(200).json(profiles);
  } catch (error) {
    // if an error occurs, pass it to Express default error handler
    return next(error);
  }
};

const createNewProfile = async (req, res, next) => {
  try {
    const { submittedUsername, submittedPassword, confirmedPassword } =
      req.body;
    if (!submittedUsername || !submittedPassword || !confirmedPassword) {
      return res.status(400).json({ message: "all fields required" });
    } else if (submittedPassword !== confirmedPassword) {
      return res.status(400).json({ message: "passwords must match" });
    }
    const duplicate = await Profile.findOne({ username: submittedUsername })
      .lean()
      .exec();
    console.log("duplicate username ❌\n", duplicate);

    if (duplicate) {
      // status 409: conflict; when a request conflicts with the current state of the server
      return res.status(409).json({ message: "username already exists" });
    }
    /* second parameter (10) is number of salt rounds; 
  
  adding salts to hashed passwords defends against rainbow table attacks (precomputed 
  list of common password hashes) and makes brute-force attacks computationally expensive */
    const hashedPwd = await bcrypt.hash(submittedPassword, 10);

    const profileDoc = { username: submittedUsername, password: hashedPwd };
    const profile = await Profile.create(profileDoc);
    // transform mongoose document object into plain JavaScript object
    const profileSansPassword = profile.toObject();
    // delete password from JavaScript object
    delete profileSansPassword.password;
    // .create() returns a promise that resolves to the newly created document (profile)
    console.log("profile created ✅\n", profileSansPassword);
    if (profileSansPassword) {
      // instantiate a jwt access token after successfully logging-in
      const accessToken = jwt.sign(
        // payload
        {
          Profile: { username: profileSansPassword.username },
        },
        // secret key
        process.env.ACCESS_TOKEN_SECRET,
        // options (algorithm: defaults to HS256 if not specified)
        { expiresIn: "10s" },
      );
      // instantiate a jwt refresh token after successfully logging-in
      const refreshToken = jwt.sign(
        {
          Profile: { username: profileSansPassword.username },
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

      return res.status(201).json([{ accessToken }, profileSansPassword.username]);
    }
    return res.status(400).json({ message: "invalid user data received" });
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

export { getAllProfiles, createNewProfile, deleteProfile };
