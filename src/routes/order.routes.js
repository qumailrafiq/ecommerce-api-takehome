const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.requireAuth, orderController.placeOrder);
router.get('/', authMiddleware.requireAuth, orderController.getMyOrders);

// Admin route
router.get('/all', authMiddleware.requireAuth, authMiddleware.isAdmin, orderController.getAllOrders);

module.exports = router;
