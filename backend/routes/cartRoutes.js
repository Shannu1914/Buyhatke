import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { getCart, setItem, clearCart } from '../controllers/cartController.js';

const router = Router();

router.get('/', protect, getCart);
router.post('/item', protect, setItem);
router.delete('/', protect, clearCart);

export default router;
