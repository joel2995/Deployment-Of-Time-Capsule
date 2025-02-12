const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes (require authentication)
router.get('/profile/:userId', authController.getUserProfile);
router.put('/profile/update',  authController.updateProfile);

// Admin routes
router.post('/create-admin', authController.createAdmin);

module.exports = router;
