const Prescription = require('../models/Prescription');

// POST /api/pharmacist/verify-otp
const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ message: 'OTP is required.' });

    const prescription = await Prescription.findOne({ otp: otp.toUpperCase(), status: 'active' })
      .populate('doctorId', 'name');

    if (!prescription)
      return res.status(404).json({ message: 'Invalid OTP or prescription already used.' });

    res.json({
      prescription: {
        id:          prescription._id,
        patientName: prescription.patientName,
        patientEmail: prescription.patientEmail,
        medication:  prescription.medication,
        dosage:      prescription.dosage,
        doctorName:  prescription.doctorId?.name || 'Doctor',
        verifiedAt:  new Date().toISOString(),
        status:      'verified'
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// PATCH /api/pharmacist/dispense/:id
const dispense = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status: 'dispensed' },
      { new: true }
    );
    if (!prescription)
      return res.status(404).json({ message: 'Prescription not found.' });

    res.json({ message: 'Dispensed successfully.', prescription });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { verifyOTP, dispense };