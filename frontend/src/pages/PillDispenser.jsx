import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"

const PillDispenser = () => {
  const [medications, setMedications] = useState([
    { id: 1, name: "Blood Pressure Medication", time: "08:00", dispensed: false },
    { id: 2, name: "Vitamin D Supplement", time: "12:00", dispensed: false },
    { id: 3, name: "Cholesterol Medication", time: "18:00", dispensed: false },
  ])

  const [currentTime, setCurrentTime] = useState(new Date())
  const [alarmDialogOpen, setAlarmDialogOpen] = useState(false)
  const [currentMedication, setCurrentMedication] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const checkMedications = () => {
      const currentTimeString = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      const medicationDue = medications.find((med) => med.time === currentTimeString && !med.dispensed)

      if (medicationDue) {
        setCurrentMedication(medicationDue)
        setAlarmDialogOpen(true)
        // Simulate sending alert to the dispenser
        console.log(`Sending alert to dispense ${medicationDue.name}`)
      }
    }

    checkMedications()
  }, [currentTime, medications])

  const handleDispenseMedication = () => {
    setMedications(medications.map((med) => (med.id === currentMedication.id ? { ...med, dispensed: true } : med)))
    setAlarmDialogOpen(false)
  }

  const resetDispenser = () => {
    setMedications(medications.map((med) => ({ ...med, dispensed: false })))
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Pill Dispenser
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Medication Schedule
            </Typography>
            <List>
              {medications.map((medication) => (
                <ListItem key={medication.id}>
                  <ListItemText primary={medication.name} secondary={`Scheduled for ${medication.time}`} />
                  {medication.dispensed ? (
                    <Typography variant="body2" color="text.secondary">
                      Dispensed
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="primary">
                      Pending
                    </Typography>
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Time
            </Typography>
            <Typography variant="h4">{currentTime.toLocaleTimeString()}</Typography>
            <Button variant="contained" color="secondary" onClick={resetDispenser} sx={{ mt: 2 }}>
              Reset Dispenser for Next Day
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={alarmDialogOpen} onClose={() => setAlarmDialogOpen(false)}>
        <DialogTitle>Medication Alert</DialogTitle>
        <DialogContent>
          <Typography>It's time to take your {currentMedication?.name}.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlarmDialogOpen(false)}>Dismiss</Button>
          <Button onClick={handleDispenseMedication} autoFocus>
            Dispense Medication
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default PillDispenser

