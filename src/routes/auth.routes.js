const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Register & login
router.post('/register', authController.register);
router.post('/login', authController.login);

// Logout clears cart
router.post('/logout', authMiddleware.requireAuth, authController.logout);

module.exports = router;
