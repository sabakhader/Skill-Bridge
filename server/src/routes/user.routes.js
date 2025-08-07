import express from 'express';
import { auth, checkRole } from '../middleware/auth.middleware.js';
import { login, register } from '../controllers/user.controller.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, (req, res) => {
  res.json({ user: req.user });
});

// Admin-only route
router.get('/admin', auth, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

export default router;