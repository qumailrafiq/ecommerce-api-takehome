import express from 'express';
import categoryController from '../controllers/category.controller.js';
import { requireAuth, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public: list all categories
router.get('/', categoryController.list);

// Admin: create & delete categories
router.post('/', requireAuth, isAdmin, categoryController.create);
router.delete('/:id', requireAuth, isAdmin, categoryController.remove);

export default router;
