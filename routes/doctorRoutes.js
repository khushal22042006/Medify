const express = require('express');
const router  = express.Router();
const path    = require('path');
const { getPrescriptions, createPrescription } = require('../controllers/doctorController');

// Auth middleware
const requireDoctor = (req, res, next) => {
  if (!req.session.userId || req.session.role !== 'doctor')
    return res.redirect('/login');
  next();
};

// Page
router.get('/dashboard', requireDoctor, (req, res) =>
  res.sendFile(path.join(__dirname, '../views/doctor/dashboard.html'))
);

// API  ✅ remove /api/doctor prefix
router.get('doctor/api/prescriptions',  requireDoctor, getPrescriptions);
router.post('doctor/api/prescriptions', requireDoctor, createPrescription);

module.exports = router;