import { Request, Response } from 'express';
import Admin from '../model/admin';
import bcrypt from 'bcryptjs';
import Order from '../model/Order';
import { setUser } from '../utils/authService';

// Signup controller
const handleAdminSignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone} = req.body;
    console.log('Request body:', req.body); 
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin); 
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({ name, email, password: hashedPassword, phone});
    await newAdmin.save();
    console.log('New Admin created:', newAdmin); 
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json({ message: 'Something went wrong while signing up' });
  }
};

// Login controller
const handleAdminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Login request body:', req.body); 
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Admin with this email does not exist'); 
      return res.status(400).json({ message: 'Admin with this email does not exist' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log('Invalid email or password'); 
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = setUser(admin);
    console.log('Login successful. Token:', token); 
    res.status(200).json({ message: 'Login successful', admin: admin, token });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Something went wrong while logging in' });
  }
};

const handleOrderFetch = async(req:Request,res:Response)=>{
    try {
        const orders = await Order.find();
        res.status(200).json({message:"All Order Fetched Successfully",allOrders:orders});
        return orders;
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
}

export default {handleAdminSignUp,handleAdminLogin,handleOrderFetch};
