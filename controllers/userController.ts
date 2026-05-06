import { Response } from 'express';
import User from '../models/User.js';

// This is a protected controller function
export const getUserProfile = async (req: any, res: Response) => {
  try {
    // req.user was attached by our authMiddleware
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error accessing dkbcluster' });
  }
};