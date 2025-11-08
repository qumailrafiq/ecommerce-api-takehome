import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import cartController from '../controllers/cart.controller.js';


const router = express.Router();

router.use(requireAuth);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart); // { productId, quantity }
router.put('/:productId', cartController.updateQuantity); // { quantity }
router.delete('/:productId', cartController.removeFromCart);

export default router;
