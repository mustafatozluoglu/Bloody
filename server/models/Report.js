const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  dateOfTest: {
    type: Date,
    required: true
  },
  results: {
    hemoglobin: Number,
    whiteBloodCells: Number,
    redBloodCells: Number,
    platelets: Number,
    // more parameters as needed
  },
  analysis: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema); 