import { useState } from "react"
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
} from "@mui/material"

const Telemedicine = () => {
  const [open, setOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "General Practitioner", available: true },
    { id: 2, name: "Dr. Michael Chen", specialty: "Cardiologist", available: false },
    { id: 3, name: "Dr. Emily Brown", specialty: "Neurologist", available: true },
    { id: 4, name: "Dr. David Wilson", specialty: "Dermatologist", available: true },
  ]

  const handleClickOpen = (doctor) => {
    setSelectedDoctor(doctor)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
            id="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="time"
            label="Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Telemedicine

