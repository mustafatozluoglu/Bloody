import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import axios from 'axios';

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Previous Reports
      </Typography>
      <List>
        {reports.map((report) => (
          <ListItem key={report._id}>
            <ListItemText
              primary={report.patientName}
              secondary={
                <>
                  <Typography component="span" variant="body2">
                    Date: {new Date(report.dateOfTest).toLocaleDateString()}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2">
                    Analysis: {report.analysis}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ReportList; 