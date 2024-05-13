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

export default { handleUserSignUp };
