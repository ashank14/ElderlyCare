import { useState } from "react"
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const Nutrition = () => {
  const [meals, setMeals] = useState([
    { id: 1, name: "Breakfast", calories: 300, protein: 15, carbs: 40, fat: 10 },
    { id: 2, name: "Lunch", calories: 500, protein: 25, carbs: 60, fat: 15 },
    { id: 3, name: "Dinner", calories: 600, protein: 30, carbs: 70, fat: 20 },
  ])

  const [newMeal, setNewMeal] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "" })

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.calories) {
      setMeals([...meals, { ...newMeal, id: Date.now() }])
      setNewMeal({ name: "", calories: "", protein: "", carbs: "", fat: "" })
    }
  }

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  const macroData = [
    { name: "Protein", value: totalProtein },
    { name: "Carbs", value: totalCarbs },
    { name: "Fat", value: totalFat },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Nutrition Tracker
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Today's Meals
            </Typography>
            <List>
              {meals.map((meal) => (
                <ListItem key={meal.id}>
                  <ListItemText
                    primary={meal.name}
                    secondary={`Calories: ${meal.calories}, Protein: ${meal.protein}g, Carbs: ${meal.carbs}g, Fat: ${meal.fat}g`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" gutterBottom>
              Add Meal
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Meal Name"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Calories"
                  type="number"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({ ...newMeal, calories: Number.parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Protein (g)"
                  type="number"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({ ...newMeal, protein: Number.parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Carbs (g)"
                  type="number"
                  value={newMeal.carbs}
                  onChange={(e) => setNewMeal({ ...newMeal, carbs: Number.parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Fat (g)"
                  type="number"
                  value={newMeal.fat}
                  onChange={(e) => setNewMeal({ ...newMeal, fat: Number.parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleAddMeal}>
                  Add Meal
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Nutrition Summary
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nutrient</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Total Calories</TableCell>
                    <TableCell align="right">{totalCalories}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Protein</TableCell>
                    <TableCell align="right">{totalProtein}g</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Carbs</TableCell>
                    <TableCell align="right">{totalCarbs}g</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Fat</TableCell>
                    <TableCell align="right">{totalFat}g</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Macronutrient Breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Typography variant="body2" align="center">
              Protein: {totalProtein}g | Carbs: {totalCarbs}g | Fat: {totalFat}g
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Nutrition

