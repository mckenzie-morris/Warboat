import express from "express";
const router = express.Router();
import { login, refresh, logout } from "../controllers/authController.js";
import loginLimiter from "../middlewares/login-limiter.js";

router.route("/").post(loginLimiter, login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

export default router;
