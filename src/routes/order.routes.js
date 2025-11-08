import express from 'express';
import orderController from '../controllers/order.controller.js';
import { requireAuth, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', requireAuth, orderController.placeOrder);
router.get('/', requireAuth, orderController.getMyOrders);

// Admin route
router.get('/all', requireAuth, isAdmin, orderController.getAllOrders);

export default router;
