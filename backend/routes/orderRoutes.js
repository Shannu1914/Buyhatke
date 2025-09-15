import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { checkout, myOrders } from '../controllers/orderController.js';

const router = Router();

router.post('/checkout', protect, checkout);
router.get('/mine', protect, myOrders);

export default router;
