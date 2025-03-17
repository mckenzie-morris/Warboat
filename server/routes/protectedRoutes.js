import express from "express";
const router = express.Router();
import { profile, changeUsername } from "../controllers/protectedController.js";

import verifyJWT from "../middlewares/verifyJWT.js";

router.use(verifyJWT)

router.route("/profile").get(profile);
router.route("/profile/username").get(changeUsername);

export default router