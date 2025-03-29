import express from "express";
const router = express.Router();
import {
  getAllProfiles,
  createNewProfile,
} from "../controllers/profileController.js";

router.route("/profiles").get(getAllProfiles).post(createNewProfile);

export default router;
