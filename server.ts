import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Import routes with .js extension (required for ESM)
import tradeRoutes from './routes/tradeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static files for uploaded screenshots
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/trades', tradeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} - DCIT 323 TypeScript Build Active`);
});