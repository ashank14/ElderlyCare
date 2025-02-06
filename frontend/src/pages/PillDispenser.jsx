import { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";

const MedCard = ({ med, setMed }) => {
  return (
    <Box sx={{ mt: 5, gap: "50px" }}>
      <Typography>Enter Medicine Name</Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={med.name}
        onChange={(e) => setMed((prev) => ({ ...prev, name: e.target.value }))}
      />
      <TextField
        label="Time"
        type="time"
        variant="outlined"
        value={med.time}
        onChange={(e) => {
          setMed((prev) => ({ ...prev, time: e.target.value }));
          console.log(med.time);
        }}
      />
    </Box>
  );
};

const PillDispenser = () => {
  const [med1, setMed1] = useState({ name: "", time: "" });
  const [med2, setMed2] = useState({ name: "", time: "" });
  const [med3, setMed3] = useState({ name: "", time: "" });
  const [med4, setMed4] = useState({ name: "", time: "" });

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/user/setSchedule", {
        med1,
        med2,
        med3,
        med4,
      });

      console.log("Schedule updated:", response.data);
      alert("Schedule updated successfully!");
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Failed to update schedule.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ml:0}}>
        <Typography variant="h4" gutterBottom>
          Pill Dispenser
        </Typography>
        <Grid sx={{ml:-25}}>
          <MedCard med={med1} setMed={setMed1} />
          <MedCard med={med2} setMed={setMed2} />
          <MedCard med={med3} setMed={setMed3} />
          <MedCard med={med4} setMed={setMed4} />
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 13, mt: 3 }}
            onClick={handleSubmit}
          >
            Add to Pill Dispenser
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PillDispenser;
