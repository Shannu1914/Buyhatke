import { Router } from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { stats, allOrders, updateOrderStatus } from '../controllers/adminController.js';

const router = Router();

router.get('/stats', protect, adminOnly, stats);
router.get('/orders', protect, adminOnly, allOrders);
router.put('/orders/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
