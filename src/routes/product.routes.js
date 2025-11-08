const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Public listing & details
router.get('/', productController.list);
router.get('/:id', productController.get);

// Admin-only routes
router.post('/', authMiddleware.requireAuth, authMiddleware.isAdmin, productController.create);
router.put('/:id', authMiddleware.requireAuth, authMiddleware.isAdmin, productController.update);
router.delete('/:id', authMiddleware.requireAuth, authMiddleware.isAdmin, productController.remove);

module.exports = router;
