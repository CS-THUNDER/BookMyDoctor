// models/Patient.js
const mongoose = require("mongoose");
const User = require("./user");

const PatientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  age: Number,
  gender: String,
  bloodGroup: String,
  allergies: [String],
  medicalHistory: [
    {
      condition: String,
      diagnosedDate: Date,
      treatment: String,
    },
  ],
});

module.exports = mongoose.model("Patient", PatientSchema);
