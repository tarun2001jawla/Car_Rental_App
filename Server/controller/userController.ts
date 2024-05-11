//Imports 
import { Request, Response } from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';
import passport from 'passport';

// Signup controller
const handleUserSignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword, phone,role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json({ message: 'Something went wrong while signing up' });
  }
};




// Login controller
// Login controller
const handleUserLogin = (req: Request, res: Response, next: any) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("user data",user);
      // Send the user data in the response
      return res.json({ message: 'Login successful', user });
      
    });
  })(req, res, next);
};

export default { handleUserSignUp, handleUserLogin };