import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/users/profile
// This fulfills the "streamline simple server operations" outcome
router.get('/profile', authMiddleware, getUserProfile);

export default router;