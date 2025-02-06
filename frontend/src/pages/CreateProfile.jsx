import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";

const UserInfoForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [hasDiseaseHistory, setHasDiseaseHistory] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [diseases, setDiseases] = useState([""]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId"); 
    if (userId) localStorage.setItem("userId", userId);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formattedDiseases = diseases.map((disease) => ({
      diseaseName: disease,
      description: "", // You can add a description input later if needed
    }));
  
    const userData = { name, age, weight, hasDiseaseHistory, dateOfBirth, medicalHistory: formattedDiseases };
  
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.put(`http://localhost:8000/api/user/updateProfile/${userId}`, userData);
      console.log("Profile updated:", response.data);
      navigate("/app/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ElderyCare+
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            margin="normal"
            required
          />
          <FormControlLabel
            control={<Checkbox checked={hasDiseaseHistory} onChange={(e) => setHasDiseaseHistory(e.target.checked)} />}
            label="Do you have a disease history?"
          />
          {hasDiseaseHistory && (
            <Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Enter Diseases
              </Typography>
              {diseases.map((disease, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <TextField
                    fullWidth
                    label={`Disease ${index + 1}`}
                    value={disease}
                    onChange={(e) => {
                      const newDiseases = [...diseases];
                      newDiseases[index] = e.target.value;
                      setDiseases(newDiseases);
                    }}
                    margin="normal"
                    required
                  />
                  <IconButton onClick={() => setDiseases(diseases.filter((_, i) => i !== index))} disabled={diseases.length === 1}>
                    <Remove />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<Add />} onClick={() => setDiseases([...diseases, ""])} sx={{ mt: 1 }}>
                Add Disease
              </Button>
            </Box>
          )}
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserInfoForm;
