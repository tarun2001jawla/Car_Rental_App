import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const handleUserLogin = (req: Request, res: Response, next: NextFunction) => {
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
      console.log('user data', user);
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
};