import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Favorite, DirectionsWalk, LocalDrink, Opacity, Restaurant, Notifications } from "@mui/icons-material"

const MotionCard = motion(Card)

const HealthMetricCard = ({ title, value, unit, icon, chart }) => (
  <MotionCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      borderRadius: "16px",
      overflow: "hidden",
    }}
  >
    <CardHeader
      avatar={icon}
      title={title}
      action={
        <IconButton aria-label="settings">
          <Notifications />
        </IconButton>
      }
      sx={{ backgroundColor: "primary.light", color: "white" }}
    />
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Typography variant="h4" component="div" align="center" sx={{ my: 2 }}>
        {value} {unit}
      </Typography>
      {chart}
    </CardContent>
  </MotionCard>
)

const Dashboard = () => {
  const [healthData, setHealthData] = useState({
    heartRate: [],
    bloodPressure: [],
    steps: [],
    hydration: [],
    bloodSugar: [],
    calories: [],
  })
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Simulate fetching health data
    const generateHealthData = () => {
      const newData = {
        heartRate: [],
        bloodPressure: [],
        steps: [],
        hydration: [],
        bloodSugar: [],
        calories: [],
      }
      for (let i = 0; i < 24; i++) {
        const time = `${i}:00`
        newData.heartRate.push({ time, value: Math.floor(Math.random() * (100 - 60) + 60) })
        newData.bloodPressure.push({ time, value: Math.floor(Math.random() * (140 - 110) + 110) })
        newData.steps.push({ time, value: Math.floor(Math.random() * 500) })
        newData.hydration.push({ time, value: Math.floor(Math.random() * 300) })
        newData.bloodSugar.push({ time, value: Math.floor(Math.random() * (180 - 70) + 70) })
        newData.calories.push({ time, value: Math.floor(Math.random() * 200) })
      }
      setHealthData(newData)
    }

    generateHealthData()
    const interval = setInterval(generateHealthData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Check for unusual metrics and generate notifications
    const checkMetrics = () => {
      const latestHeartRate = healthData.heartRate[healthData.heartRate.length - 1]?.value
      const latestBloodPressure = healthData.bloodPressure[healthData.bloodPressure.length - 1]?.value
      const latestBloodSugar = healthData.bloodSugar[healthData.bloodSugar.length - 1]?.value

      if (latestHeartRate > 100 || latestHeartRate < 60) {
        addNotification(`Unusual heart rate detected: ${latestHeartRate} bpm`)
      }
      if (latestBloodPressure > 140 || latestBloodPressure < 90) {
        addNotification(`Unusual blood pressure detected: ${latestBloodPressure} mmHg`)
      }
      if (latestBloodSugar > 180 || latestBloodSugar < 70) {
        addNotification(`Unusual blood sugar level detected: ${latestBloodSugar} mg/dL`)
      }
    }

    checkMetrics()
  }, [healthData])

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message }])
  }

  const sendAlert = () => {
    // Simulate sending alerts to hospitals and families
    console.log("Sending alerts to hospitals and families")
    addNotification("Alerts sent to hospitals and families")
  }

  const renderChart = (data, dataKey, stroke) => (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={data}>
        <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false} />
        <XAxis dataKey="time" hide />
        <YAxis hide />
      </LineChart>
    </ResponsiveContainer>
  )

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Health Dashboard
        </Typography>
      </motion.div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <HealthMetricCard
                title="Heart Rate"
                value={healthData.heartRate[healthData.heartRate.length - 1]?.value}
                unit="bpm"
                icon={<Favorite color="error" />}
                chart={renderChart(healthData.heartRate, "value", "#f44336")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <HealthMetricCard
                title="Blood Pressure"
                value={healthData.bloodPressure[healthData.bloodPressure.length - 1]?.value}
                unit="mmHg"
                icon={<Opacity color="primary" />}
                chart={renderChart(healthData.bloodPressure, "value", "#2196f3")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <HealthMetricCard
                title="Steps"
                value={healthData.steps.reduce((sum, item) => sum + item.value, 0)}
                unit="steps"
                icon={<DirectionsWalk color="success" />}
                chart={renderChart(healthData.steps, "value", "#4caf50")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <HealthMetricCard
                title="Hydration"
                value={healthData.hydration.reduce((sum, item) => sum + item.value, 0)}
                unit="ml"
                icon={<LocalDrink color="info" />}
                chart={renderChart(healthData.hydration, "value", "#03a9f4")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <HealthMetricCard
                title="Blood Sugar"
                value={healthData.bloodSugar[healthData.bloodSugar.length - 1]?.value}
                unit="mg/dL"
                icon={<Opacity color="secondary" />}
                chart={renderChart(healthData.bloodSugar, "value", "#9c27b0")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <HealthMetricCard
                title="Calories"
                value={healthData.calories.reduce((sum, item) => sum + item.value, 0)}
                unit="kcal"
                icon={<Restaurant color="warning" />}
                chart={renderChart(healthData.calories, "value", "#ff9800")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <List sx={{ flexGrow: 1, overflow: "auto" }}>
                {notifications.slice(-5).map((notification) => (
                  <ListItem key={notification.id}>
                    <ListItemText primary={notification.message} />
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" color="secondary" onClick={sendAlert} sx={{ mt: 2 }}>
                Send Emergency Alert
              </Button>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard

