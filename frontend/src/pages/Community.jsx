import React, { useState } from "react"
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material"

const Community = () => {
  const [communities, setCommunities] = useState([
    { id: 1, name: "Book Club", members: 15, joined: false },
    { id: 2, name: "Gardening Enthusiasts", members: 23, joined: false },
    { id: 3, name: "Chess Players", members: 8, joined: false },
    { id: 4, name: "Walking Group", members: 30, joined: false },
  ])

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Book Discussion: Pride and Prejudice",
      date: "2023-06-15",
      time: "14:00",
      location: "Community Center",
    },
    { id: 2, name: "Gardening Workshop", date: "2023-06-18", time: "10:00", location: "Local Park" },
    { id: 3, name: "Chess Tournament", date: "2023-06-20", time: "13:00", location: "Senior Center" },
    { id: 4, name: "Group Walk in the Park", date: "2023-06-22", time: "09:00", location: "City Park Entrance" },
  ])

  const toggleJoin = (id) => {
    setCommunities(
      communities.map((community) => (community.id === id ? { ...community, joined: !community.joined } : community)),
    )
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Community
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Join Communities
          </Typography>
          <Grid container spacing={2}>
            {communities.map((community) => (
              <Grid item xs={12} sm={6} key={community.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{community.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Members: {community.members}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant={community.joined ? "outlined" : "contained"}
                      onClick={() => toggleJoin(community.id)}
                    >
                      {community.joined ? "Leave" : "Join"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Upcoming Events
          </Typography>
          <List>
            {events.map((event, index) => (
              <React.Fragment key={event.id}>
                <ListItem>
                  <ListItemText primary={event.name} secondary={`${event.date} at ${event.time}, ${event.location}`} />
                </ListItem>
                {index < events.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Community

