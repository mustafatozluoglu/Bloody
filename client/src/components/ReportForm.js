import React, { useState } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';
import axios from 'axios';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfTest: '',
    results: {
      hemoglobin: '',
      whiteBloodCells: '',
      redBloodCells: '',
      platelets: ''
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/reports/analyze', formData);
      console.log('Analysis:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Patient Name"
            value={formData.patientName}
            onChange={(e) => setFormData({...formData, patientName: e.target.value})}
          />
          <TextField
            type="date"
            label="Date of Test"
            InputLabelProps={{ shrink: true }}
            value={formData.dateOfTest}
            onChange={(e) => setFormData({...formData, dateOfTest: e.target.value})}
          />
          <TextField
            label="Hemoglobin"
            type="number"
            value={formData.results.hemoglobin}
            onChange={(e) => setFormData({
              ...formData,
              results: {...formData.results, hemoglobin: e.target.value}
            })}
          />
          {/* Add more fields for other blood parameters */}
          <Button variant="contained" type="submit">
            Analyze Report
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ReportForm; 