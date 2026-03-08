const Prescription = require('../models/Prescription');

// GET /api/doctor/prescriptions
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctorId: req.session.userId }).sort({ createdAt: -1 });
    res.json({ prescriptions });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// POST /api/doctor/prescriptions
const createPrescription = async (req, res) => {
  try {
    const { patientName, patientEmail, medication, dosage, frequency, duration, instructions } = req.body;

    if (!patientName || !medication || !dosage)
      return res.status(400).json({ message: 'Patient name, medication, and dosage are required.' });

    const otp = Math.random().toString(36).substring(2, 8).toUpperCase();

    const prescription = await Prescription.create({
      doctorId: req.session.userId,
      patientName, patientEmail,
      medication, dosage, frequency, duration, instructions,
      otp, status: 'active'
    });

    res.status(201).json({ prescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getPrescriptions, createPrescription };
