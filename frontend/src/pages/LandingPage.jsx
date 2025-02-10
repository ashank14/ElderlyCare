import { Link as RouterLink } from "react-router-dom"
import { motion } from "framer-motion"
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia, Box } from "@mui/material"
import { Favorite, Security, Elderly, LocalHospital } from "@mui/icons-material"
import Phone from "../assets/phone.jpg"
import Family from "../assets/family.jpg"
const features = [
  {
    title: "Health Monitoring",
    description: "Real-time tracking of vital signs and health metrics.",
    icon: <Favorite fontSize="large" color="primary" />,
  },
  {
    title: "Medication Management",
    description: "Smart pill dispenser with reminders and tracking.",
    icon: <LocalHospital fontSize="large" color="primary" />,
  },
  {
    title: "Community Engagement",
    description: "Connect with peers and join local events.",
    icon: <Elderly fontSize="large" color="primary" />,
  },
  {
    title: "Emergency Response",
    description: "Quick access to emergency services and contacts.",
    icon: <Security fontSize="large" color="primary" />,
  },
]

const MotionCard = motion(Card)

const LandingPage = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh"}}>
      <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ElderyCare+
          </Typography>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my:  25 }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to ElderlyCare+
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Empowering seniors with innovative care solutions for a healthier, more connected life.
            </Typography>
          </motion.div>
          <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/login"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>
        </Box>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MotionCard
                sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center">{feature.description}</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Why Choose ElderyCare+?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MotionCard
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <CardMedia component="img" height="240" image={Phone} alt="Senior using ElderyCare+ app" />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Comprehensive Care
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our all-in-one platform provides a holistic approach to senior care, combining health monitoring,
                    medication management, and social engagement.
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionCard initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={Family}
                  alt="Family members using ElderyCare+"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Peace of Mind for Families
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stay connected with your loved ones and receive real-time updates on their well-being, all through
                    our user-friendly interface.
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box sx={{ bgcolor: "primary.main", color: "white", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          ElderyCare+
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          Enhancing the quality of life for seniors through technology and care.
        </Typography>
      </Box>
    </Box>
  )
}

export default LandingPage

