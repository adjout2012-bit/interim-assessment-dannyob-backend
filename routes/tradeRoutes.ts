import { Router } from 'express';
import { logTrade, getTradeHistory, upload } from '../controllers/tradeController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

/**
 * ROUTE: LOG A NEW TRADE
 * Combines Authentication and Multimedia Upload logic.
 * The 'screenshot' string matches the name attribute in your frontend form.
 */
router.post('/log', authMiddleware, upload.single('screenshot'), logTrade);

/**
 * ROUTE: FETCH TRADE HISTORY
 * Fulfills the "Node.js for basic backend and tooling operations" objective.
 */
router.get('/history', authMiddleware, getTradeHistory);

export default router;