import { Request, Response, NextFunction } from 'express';
import { getUser } from '../utils/authService';
import { CustomRequest } from '../types';

function checkForAuthentication(req: CustomRequest, res: Response, next: NextFunction) {
  console.log('Request Cookies:', req.cookies);
  console.log('Request Headers:', req.headers);
  const cookie = req.headers['cookie'];
  console.log('Cookie:', cookie);
  try {
    req.user = null;
    const tokenCookie = req.cookies.token;
    console.log('Token Cookie:', tokenCookie);
    if (!tokenCookie) {
      console.log('Token cookie not found');
      return next();
    }
    const user = getUser(tokenCookie);
    console.log('User extracted from token:', user);
    if (!user) {
      console.log('Invalid token');
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = user;
    console.log('User:', req.user);
    next();
  } catch (error) {
    console.error('Error in checkForAuthentication middleware:', error);
    res.status(500).send('Internal Server Error while checking for authentication');
  }
}



export { checkForAuthentication };