import express from 'express';
const router = express.Router();
import authController from '../controller/userController';
import { handleUserLogin } from '../controller/authController';

// User Routes
router.post('/signup', authController.handleUserSignUp);
router.post('/login', handleUserLogin);

export default router;