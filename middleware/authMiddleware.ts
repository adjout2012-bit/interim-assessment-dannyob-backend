import type { Request, Response, NextFunction } from 'express'; // ✅ Use 'import type'
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Defining an interface to extend the Express Request type
// This hits our Week 7 TypeScript objectives for interfaces
interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Get the token from the header
  const token = req.header('Authorization')?.split(' ')[1];

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // Attach the user from the payload to the request object
    req.user = decoded;
    
    // Move to the next function in the route
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;