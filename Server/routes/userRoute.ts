import express from "express";
const router = express.Router();
import authController from "../controller/userController";

// User Routes
router.post("/signup", authController.handleUserSignUp);
router.post("/login", authController.handleUserLogin);

export default router;