import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { db } from '../../../firebase';

function AddRoom(props) {
    const [open, setOpen] = React.useState(true);
    const [name, setName] = React.useState('')
    const [photo, setPhoto] = React.useState('')

  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = ()=>{
      if(name.length>0 && photo.length>0){
        db.collection('rooms').add({
          name:name,
          roomPhoto:photo
        })
      }
      setOpen(false)
      setName('')
      setPhoto('')
    }
  return (
   
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Add New Chat</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Enter Room Name and Insert a Room Profile Image URL
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="roomName"
        label="Room Name"
        type="text"
        fullWidth
        variant="standard"
        value={name}
        required
        onChange={(e)=>setName(e.target.value)}
      />
      <TextField
        autoFocus
        margin="dense"
        id="roomPhoto"
        label="Room Image"
        type="url"
        fullWidth
        variant="standard"
        required
        value={photo}
        onChange={(e)=>setPhoto(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button  onClick={handleSubmit}>Create a room</Button>
    </DialogActions>
  </Dialog>
  )
}

export default AddRoom