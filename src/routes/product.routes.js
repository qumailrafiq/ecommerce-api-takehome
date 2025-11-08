import express from 'express';
import productController from '../controllers/product.controller.js';
import { requireAuth, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public listing & details
router.get('/', productController.list);
router.get('/:id', productController.get);

// Admin-only routes
router.post('/', requireAuth, isAdmin, productController.create);
router.put('/:id', requireAuth, isAdmin, productController.update);
router.delete('/:id', requireAuth, isAdmin, productController.remove);

export default router;
