import express from "express";
const router = express.Router();
import {
  profile,
  changeUsername,
  changePassword,
  deleteProfile,
} from "../controllers/protectedController.js";

import verifyJWT from "../middlewares/verifyJWT.js";

router.use(verifyJWT);

router.route("/profile").get(profile);
router.route("/profile/username").patch(changeUsername);
router.route("/profile/password").patch(changePassword);
router.route("/profile/delete").delete(deleteProfile);

export default router;
