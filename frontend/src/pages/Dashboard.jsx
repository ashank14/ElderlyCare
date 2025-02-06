import { useState, useEffect } from "react";
import { Grid, Container, Typography } from "@mui/material";
import { Favorite, Opacity, DirectionsWalk, LocalDrink, Restaurant } from "@mui/icons-material";
import HealthMetricCard from "./HealthMetricCard";
import axios from "axios";


const API_BASE_URL = "http://localhost:8000/api/user"; // Change this to your backend URL

export const fetchHealthMetrics = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User ID not found in localStorage");

    const response = await axios.get(`${API_BASE_URL}/health-metrics/${userId}`);
    return response.data; // Returns the array of health metrics
  } catch (error) {
    console.error("Error fetching health metrics:", error.response?.data || error.message);
    return null;
  }
};

const Dashboard = () => {
  const [healthMetrics, setHealthMetrics] = useState([]);

  useEffect(() => {


   

    const getMetrics = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const data = await fetchHealthMetrics(userId);
      if (data) setHealthMetrics(data);
    };

    getMetrics();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Health Dashboard
      </Typography>

      {healthMetrics.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          Connect watch to get started
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {healthMetrics.map((metric) => (
            <Grid item xs={12} sm={6} md={4} key={metric.id}>
              <HealthMetricCard
                title={metric.metricName}
                value={metric.value}
                unit={metric.unit}
                icon={
                  metric.metricName === "Heart Rate" ? <Favorite color="error" /> :
                  metric.metricName === "Blood Pressure" ? <Opacity color="primary" /> :
                  metric.metricName === "Steps" ? <DirectionsWalk color="success" /> :
                  metric.metricName === "Hydration" ? <LocalDrink color="info" /> :
                  metric.metricName === "Calories" ? <Restaurant color="warning" /> :
                  null
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
