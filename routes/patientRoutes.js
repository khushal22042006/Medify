const express = require('express');
const router  = express.Router();
const path    = require('path');
const { getPrescriptions, getReminders, markTaken } = require('../controllers/patientController');

const requirePatient = (req, res, next) => {
  if (!req.session.userId || req.session.role !== 'patient')
    return res.redirect('/login');
  next();
};

// Page
router.get('/dashboard', requirePatient, (req, res) =>
  res.sendFile(path.join(__dirname, '../views/patient/dashboard.html'))
);

// API
router.get('/api/prescriptions',          requirePatient, getPrescriptions);
router.get('/api/reminders',              requirePatient, getReminders);
router.patch('/api/reminders/:id/taken',  requirePatient, markTaken);

module.exports = router;