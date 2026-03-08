const Prescription = require('../models/Prescription');

// GET /api/patient/prescriptions
const getPrescriptions = async (req, res) => {
  try {
    // ✅ fetch ALL statuses (active + dispensed = full history)
    // ✅ match by session email
    const prescriptions = await Prescription.find({
      patientEmail: req.session.userEmail
    }).populate('doctorId', 'name').sort({ createdAt: -1 });

    const formatted = prescriptions.map(p => ({
      ...p.toObject(),
      doctorName: p.doctorId?.name || 'Your Doctor'
    }));

    res.json({ prescriptions: formatted });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/patient/reminders
const getReminders = async (req, res) => {
  try {
    res.json({ reminders: req.session.reminders || [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// PATCH /api/patient/reminders/:id/taken
const markTaken = async (req, res) => {
  try {
    const reminders = req.session.reminders || [];
    const r = reminders.find(r => r.id === req.params.id);
    if (r) { r.taken = true; req.session.reminders = reminders; }
    res.json({ message: 'Marked as taken.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getPrescriptions, getReminders, markTaken };