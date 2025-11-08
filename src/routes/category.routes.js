const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { requireAuth, isAdmin } = require('../middlewares/auth.middleware');

// Public: list all categories
router.get('/', categoryController.list);

// Admin: create & delete categories
router.post('/', requireAuth, isAdmin, categoryController.create);
router.delete('/:id', requireAuth, isAdmin, categoryController.remove);

module.exports = router;
