import express from "express";
const router = express.Router();
import { profile } from "../controllers/protectedController.js";

import verifyJWT from "../middlewares/verifyJWT.js";

router.use(verifyJWT)

router.route("/profile").get(profile);

export default router