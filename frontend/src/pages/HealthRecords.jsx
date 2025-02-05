import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const HealthRecords = () => {
  const records = [
    { date: '2023-05-01', type: 'Annual Checkup', doctor: 'Dr. Smith', notes: 'All vitals normal' },
    { date: '2023-03-15', type: 'Blood Test', doctor: 'Dr. Johnson', notes: 'Cholesterol slightly elevated' },
    { date: '2023-02-10', type: 'Vaccination', doctor: 'Dr. Brown', notes: 'Flu shot administered' },
    { date: '2023-01-05', type: 'X-Ray', doctor: 'Dr. Davis', notes: 'No abnormalities detected' },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Health Records
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.doctor}</TableCell>
                <TableCell>{record.notes}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HealthRecords;
