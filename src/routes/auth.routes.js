import express from 'express';
import authController from '../controllers/auth.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Register & login
router.post('/register', authController.register);
router.post('/login', authController.login);

// Logout clears cart
router.post('/logout', requireAuth, authController.logout);

export default router;
