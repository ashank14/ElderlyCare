import { Link, Outlet } from "react-router-dom"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  ExpandMore,
  Dashboard,
  Group,
  Medication,
  Person,
  HealthAndSafety,
  ContactPhone,
  Videocam,
  Restaurant,
} from "@mui/icons-material"

const drawerWidth = 240

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const MotionListItem = motion(ListItem)

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ElderyCare+
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "primary.main",
            color: "white",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Accordion defaultExpanded sx={{ backgroundColor: "transparent", color: "inherit" }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />}>
            <Typography>Navigation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {[
                { text: "Dashboard", icon: <Dashboard />, link: "/app/dashboard" },
                { text: "Community", icon: <Group />, link: "/app/community" },
                { text: "Pill Dispenser", icon: <Medication />, link: "/app/pill-dispenser" },
                { text: "Profile", icon: <Person />, link: "/app/profile" },
                { text: "Health Records", icon: <HealthAndSafety />, link: "/app/health-records" },
                { text: "Emergency Contacts", icon: <ContactPhone />, link: "/app/emergency-contacts" },
                { text: "Telemedicine", icon: <Videocam />, link: "/app/telemedicine" },
                { text: "Nutrition", icon: <Restaurant />, link: "/app/nutrition" },
              ].map((item, index) => (
                <MotionListItem
                  button
                  key={item.text}
                  component={Link}
                  to={item.link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </MotionListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Drawer>
      <Main open={true}>
        <Toolbar />
        <Outlet />
      </Main>
    </Box>
  )
}

export default Layout

