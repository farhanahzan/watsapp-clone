import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Avatar from '@mui/material/Avatar';

function SendImage({ show, setShow, file, handleUpload }) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogContent>
        <Avatar src={URL.createObjectURL(file)} variant="rounded"></Avatar>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpload}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SendImage;
