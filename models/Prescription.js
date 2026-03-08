const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  doctorId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName:  { type: String, required: true },
  patientEmail: { type: String, default: '' },
  medication:   { type: String, required: true },
  dosage:       { type: String, required: true },
  frequency:    { type: String, default: '' },
  duration:     { type: String, default: '' },
  instructions: { type: String, default: '' },
  otp:          { type: String, required: true },
  status:       { type: String, enum: ['active', 'dispensed', 'expired'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);