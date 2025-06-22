// models/Doctor.js
const mongoose = require("mongoose");
const User = require("./user");

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: true,
    enum: ['cardiology', 'dermatology', 'neurology', 'pediatrics', 'orthopedics', 'general'],
    default: 'general'
  },
  qualifications: {
    type: [String],
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  availableSlots: [
    {
      day: String,
      times: [String]
    }
  ],
  consultationFee: {
    type: Number,
    required: true
  },
  bio: String,
  hospitalAffiliation: String
}, { timestamps: true });

module.exports = mongoose.model("Doctor", DoctorSchema);
