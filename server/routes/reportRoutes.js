const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const analyzeReport = require('../services/aiService');

router.post('/analyze', async (req, res) => {
  try {
    const reportData = req.body;
    
    // Analyze the report using AI
    const analysis = await analyzeReport(reportData.results);
    
    // Create new report
    const report = new Report({
      ...reportData,
      analysis
    });
    
    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 