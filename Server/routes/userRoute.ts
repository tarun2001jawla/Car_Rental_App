import express from "express";
const router = express.Router();
import authController from "../controller/userController";

import passport from 'passport';

// User Routes
router.post("/signup", authController.handleUserSignUp);
// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred while logging in' });
      }
      // If login is successful, send user data in response
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});


export default router;