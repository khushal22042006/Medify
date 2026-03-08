const express = require('express');
const router  = express.Router();
const path    = require('path');
const { register, login, logout, me } = require('../controllers/authController');

// ── Page routes ──────────────────────────────────────
router.get('/',         (req, res) => res.sendFile(path.join(__dirname, '../views/index.html')));
router.get('/login',    (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));
router.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../views/register.html')));

// ── API routes ───────────────────────────────────────
router.post('/api/auth/register', register);
router.post('/api/auth/login',    login);
router.post('/api/auth/logout',   logout);
router.get('/api/auth/me',        me);  // ✅ moved here

module.exports = router;