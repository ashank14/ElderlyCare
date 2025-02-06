import {motion} from "framer-motion"
import {Card, 
    CardHeader,
    Typography,
    CardContent,
    IconButton
} from "@mui/material"
const MotionCard = motion(Card)

const HealthMetricCard = ({ name, value, unit, icon}) => (
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
      title={name}
      action={
        <IconButton aria-label="settings">
        </IconButton>
      }
      sx={{ backgroundColor: "primary.light", color: "white" }}
    />
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Typography variant="h4" component="div" align="center" sx={{ my: 2 }}>
        {value} {unit}
      </Typography>
    </CardContent>
  </MotionCard>
)

export default HealthMetricCard