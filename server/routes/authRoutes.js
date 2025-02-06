import express from "express";
const router = express.Router();
import { login, refresh, logout } from "../controllers/authController.js";

router.route("/").post(login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

export default router;
