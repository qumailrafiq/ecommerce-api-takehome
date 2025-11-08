const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware.requireAuth);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart); // { productId, quantity }
router.put('/:productId', cartController.updateQuantity); // { quantity }
router.delete('/:productId', cartController.removeFromCart);

module.exports = router;
