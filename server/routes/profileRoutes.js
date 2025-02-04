import express from "express";
const router = express.Router();
import {
  getAllProfiles,
  getProfile,
  createNewProfile,
  updateProfileUsername,
  updateProfilePassword,
  deleteProfile,
} from "../controllers/profileController.js";

router
  .route("/profiles")
  .get(getAllProfiles)
  // .get(getProfile)
  .post(createNewProfile);
// .patch(updateProfileUsername)
// .patch(updateProfilePassword)
// .delete(deleteProfile);

export default router;
