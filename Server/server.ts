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
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';

dotenv.config();

// Initializing Express App
const app: Application = express();
const PORT = process.env.PORT || 5000;


// Initialize Passport
app.use(session({ secret: process.env.SESSION_SECRET || '', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/car_rental_DB")
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));


//middlewares
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

// Configure Passport Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '869079217064-rgrjbdhfuubi51fc2kksfn11va6sfegm.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
      callbackURL: 'http://localhost:5000/auth/google/callback',
      
      
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log('Google strategy callback called');
        console.log('Profile:', profile);
        
       
    if (!user) {
      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value, 
        password: 'defaultPassword', 
        phone: '123456789', 
        profile,
      });
      user = await newUser.save();
    }

        return done(null, user);
      } catch (err) {
        console.error('Google strategy error:', err);
        return done(err);
      }
    }
  )
);

// Configure Passport GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: '/auth/github/callback',
      
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value, 
            password: 'defaultPassword', 
            phone: '123456789', 
            profile,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], }), (req, res) => {
  console.log('Google authentication route hit');
});


app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/login',
  }),
  (req, res) => {
    console.log('Google authentication callback route hit');
  }
);




app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/login',
  })
);

// Express route
app.get('/api/user', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
    console.log("user:",req.user);
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
app.use("/api/reserve",orderRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World,Welcome to Server");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
