const express = require('express');
const router  = express.Router();
const path    = require('path');
const { verifyOTP, dispense } = require('../controllers/pharmacistController');

const requirePharmacist = (req, res, next) => {
  if (!req.session.userId || req.session.role !== 'pharmacist')
    return res.redirect('/login');
  next();
};

// Page
router.get('/dashboard', requirePharmacist, (req, res) =>
  res.sendFile(path.join(__dirname, '../views/pharmacist/dashboard.html'))
);

// API
router.post('/api/verify-otp',    requirePharmacist, verifyOTP);
router.patch('/api/dispense/:id', requirePharmacist, dispense);

module.exports = router;