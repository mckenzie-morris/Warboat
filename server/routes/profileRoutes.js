import express from "express";
const router = express.Router();
import {
  getAllProfiles,
  createNewProfile,
  deleteProfile,
} from "../controllers/profileController.js";

router
  .route("/profiles")
  .get(getAllProfiles)
  .post(createNewProfile)
  .delete(deleteProfile);

export default router;
