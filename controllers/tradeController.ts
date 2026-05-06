import type { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import Trade from '../models/Trade';

// 1. Set up storage engine - Essential for the "Multimedia" part of the course
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// 2. Initialize upload middleware
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Images Only! (Multimedia constraint)'));
    }
  }
});

// 3. Log Trade Controller
export const logTrade = async (req: any, res: Response) => {
  const { entryPrice, stopLoss, takeProfit, positionType } = req.body;

  try {
    const newTrade = new Trade({
      user: req.user.id,
      entryPrice,
      stopLoss,
      takeProfit,
      positionType,
      screenshot: req.file ? req.file.path : null 
    });

    const trade = await newTrade.save();
    res.status(201).json(trade);
  } catch (err: any) { // Fixed: 'err' typing to avoid 'unknown' error
    res.status(500).json({ message: 'Server Error saving to dkbcluster', error: err.message });
  }
};

// 4. Get Trade History Controller
// Fixed: Removed the duplicated logTrade logic that was inside the catch block
export const getTradeHistory = async (req: any, res: Response) => {
  try {
    // Fulfills "simple server operations" outcome[cite: 1]
    const trades = await Trade.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(trades);
  } catch (err: any) { 
    console.error(err.message);
    res.status(500).send('Server Error fetching from dkbcluster');
  }
};