import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute';
import carRoutes from './routes/carRoutes';
import orderRoutes from './routes/orderRoutes'
import User from "./model/User";
import session from 'express-session';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import fetchOrderRoute from './routes/fetchOrderRoute';
import { Strategy as LocalStrategy } from 'passport-local';
import { googleAuth, googleAuthCallback } from './controller/googleAuthController';
import { githubAuth, githubAuthCallback } from './controller/githubAuthController';

dotenv.config();

// Initializing Express App
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Initialize Passport
app.use(session({ secret: process.env.SESSION_SECRET || '', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Database connection

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://TarunJawla:Tarunjawla%40123@atlascluster.7hp44bd.mongodb.net/car_rental_app?retryWrites=true&w=majority&appName=AtlasCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports = (req:Request, res:Response) => {
  res.status(200).json({ message: 'Hello from Vercel serverless function!' });
};

//middlewares
app.use(express.json());
app.use(cors({
  origin: 'https://car-rental-app-ruddy.vercel.app/', 
  credentials: true 
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure Passport local strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);



  
 

// Google authentication routes
app.get('/auth/google', googleAuth);
app.get('/auth/google/callback', googleAuthCallback);

// GitHub authentication routes
app.get('/auth/github', githubAuth);
app.get('/auth/github/callback', githubAuthCallback);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/',
  })
);

// Express route to fetch user data
app.get('/api/user', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
    console.log("user:", req.user);
  } else {
    res.json({ user: null });
  }
});

// Serialize and deserialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password'); 
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//Routes 
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reserve", orderRoutes);
app.use("/api/orders",fetchOrderRoute);

// Default route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World,Welcome to Server");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
