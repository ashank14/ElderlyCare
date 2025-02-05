import { useState } from "react"
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import { Edit, Delete, Add } from "@mui/icons-material"

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "John Doe", relation: "Son", phone: "(123) 456-7890" },
    { id: 2, name: "Jane Smith", relation: "Daughter", phone: "(987) 654-3210" },
    { id: 3, name: "Dr. Johnson", relation: "Primary Care Physician", phone: "(555) 123-4567" },
  ])

  const [open, setOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({ name: "", relation: "", phone: "" })

  const handleClickOpen = (contact = { name: "", relation: "", phone: "" }) => {
    setCurrentContact(contact)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    if (currentContact.id) {
      setContacts(contacts.map((c) => (c.id === currentContact.id ? currentContact : c)))
    } else {
      setContacts([...contacts, { ...currentContact, id: Date.now() }])
    }
    handleClose()
  }

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id))
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Emergency Contacts
      </Typography>
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact.id}>
            <ListItemText primary={contact.name} secondary={`${contact.relation} - ${contact.phone}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(contact)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(contact.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleClickOpen()}>
        Add Contact
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentContact.id ? "Edit Contact" : "Add Contact"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={currentContact.name}
            onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Relation"
            type="text"
            fullWidth
            value={currentContact.relation}
            onChange={(e) => setCurrentContact({ ...currentContact, relation: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="tel"
            fullWidth
            value={currentContact.phone}
            onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default EmergencyContacts

