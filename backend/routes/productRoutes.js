import { Router } from 'express';
import {
  listProducts,
  getProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', listProducts);
router.get('/:slug', getProduct);

router.post('/', protect, adminOnly, adminCreateProduct);
router.put('/:id', protect, adminOnly, adminUpdateProduct);
router.delete('/:id', protect, adminOnly, adminDeleteProduct);

export default router;
