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
import cluster from 'cluster'; 
import os from 'os'; 

dotenv.config();

// Initializing Express App
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Initialize Passport
app.use(session({ secret: process.env.SESSION_SECRET || '', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/car_rental_DB';

// Establishing MongoDB connection
mongoose.connect(mongoURI);

// Handling connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
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

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reserve", orderRoutes);
app.use("/api/orders", fetchOrderRoute);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World, Welcome to Server");
});

// Check if the process is the master or a worker
if (cluster.isPrimary) {
  // If the process is the master, create worker processes based on the number of CPUs
  const numCPUs = os.cpus().length;
  console.log(`Master process started with PID ${process.pid}`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exits
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  // If the process is a worker, start the Express server
  startServer();
}

function startServer() {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started. Server is running on port ${PORT}`);
  });
}