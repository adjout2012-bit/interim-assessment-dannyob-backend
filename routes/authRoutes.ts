import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// GET /api/auth/dashboard-data — Protected route
router.get('/dashboard-data', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the protected trade data, Charley!' });
});

export default router;