import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

export default router
  .route("/profile")
  .get(userController.getUser)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
