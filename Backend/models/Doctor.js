// models/Doctor.js
const mongoose = require("mongoose");
const User = require("./user");

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  qualifications: {
    type: [String],
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  availableSlots: [
    {
      day: String,
      times: [String],
    },
  ],
  consultationFee: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
