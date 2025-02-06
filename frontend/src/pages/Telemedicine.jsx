import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

const Telemedicine = () => {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState({ date: "", time: "" });

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "General Practitioner", available: true },
    { id: 2, name: "Dr. Michael Chen", specialty: "Cardiologist", available: false },
    { id: 3, name: "Dr. Emily Brown", specialty: "Neurologist", available: true },
    { id: 4, name: "Dr. David Wilson", specialty: "Dermatologist", available: true },
  ];

  const handleClickOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAppointmentDetails({ date: "", time: "" });
  };

  const handleSchedule = () => {
    if (appointmentDetails.date && appointmentDetails.time) {
      setScheduledAppointments([...scheduledAppointments, { ...selectedDoctor, ...appointmentDetails }]);
    }
    handleClose();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Telemedicine Consultations
      </Typography>
      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.specialty}
                </Typography>
                <Typography variant="body2" color={doctor.available ? "success.main" : "error.main"}>
                  {doctor.available ? "Available" : "Unavailable"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  disabled={!doctor.available}
                  onClick={() => handleClickOpen(doctor)}
                >
                  Schedule Consultation
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Schedule Consultation with {selectedDoctor?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a date and time for your telemedicine consultation with {selectedDoctor?.name}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={appointmentDetails.date}
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={appointmentDetails.time}
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSchedule} color="primary">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Scheduled Consultations
      </Typography>
      <Grid container spacing={3}>
        {scheduledAppointments.map((appointment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {appointment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {appointment.specialty}
                </Typography>
                <Typography variant="body2">Date: {appointment.date}</Typography>
                <Typography variant="body2">Time: {appointment.time}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Telemedicine;
