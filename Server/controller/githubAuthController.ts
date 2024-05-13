import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../model/User';
import dotenv from 'dotenv';

dotenv.config();

// Configure Passport GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:5000/auth/github/callback',
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract email from the profile
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        // Find or create user based on GitHub ID
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          // Create a new user with GitHub profile and email
          user = new User({
            githubId: profile.id,
            email: email,
            name: profile.displayName,
            password: 'password', // Default password
            phone: '123456789', // Default phone
          });
          await user.save();
        }

        return done(null, user);

      } catch (err) {
        return done(err);
      }
    }
  )
);

// GitHub authentication routes
export const githubAuth = (req, res, next) => {
  passport.authenticate('github')(req, res, next);
};

export const githubAuthCallback = (req, res, next) => {
  passport.authenticate('github', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/',
  })(req, res, next);
};
