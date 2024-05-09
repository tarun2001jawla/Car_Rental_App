import { Request, Response } from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';
import { setUser } from '../utils/authService';

// Signup controller
const handleUserSignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone,role } = req.body;
    console.log('Request body:', req.body); 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', existingUser); 
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword, phone});
    await newUser.save();
    console.log('New user created:', newUser); 
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json({ message: 'Something went wrong while signing up' });
  }
};

// Login controller
const handleUserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Login request body:', req.body); 
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User with this email does not exist'); 
      return res.status(400).json({ message: 'User with this email does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid email or password'); 
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = setUser(user);
    console.log('Login successful. Token:', token); 
    res.status(200).json({ message: 'Login successful', user: user, token });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Something went wrong while logging in' });
  }
};

export default { handleUserSignUp, handleUserLogin };
