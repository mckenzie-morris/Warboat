import express from "express";
const router = express.Router();
import wildcardController from '../controllers/wildcardController.js'

export default router.use("*", wildcardController);