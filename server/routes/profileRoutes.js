import express from "express";
const router = express.Router();
import {
  getAllProfiles,
  createNewProfile,
  deleteProfile,
} from "../controllers/profileController.js";

import verifyJWT from "../middlewares/verifyJWT.js";

router.use(verifyJWT)

router
  .route("/profiles")
  .get(getAllProfiles)
  .post(createNewProfile)
  .delete(deleteProfile);

export default router;
