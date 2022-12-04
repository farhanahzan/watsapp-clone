import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

function SendImage({ show, setShow, file, handleUpload, setCaption }) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogContent
        sx={{
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar
          sx={{ width: '250px', objectFit: 'cover', height: '100%' }}
          src={file ? URL.createObjectURL(file) : null}
          variant="rounded"
        ></Avatar>
        <TextField
          onChange={(e) => setCaption(e.target.value)}
          autoFocus
          multiline
          margin="dense"
          id="caption"
          label="Image Caption"
          type="text"
          sx={{ width: '230px' }}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SendRoundedIcon
                  sx={{ cursor: 'pointer', color: 'primary.main' }}
                  onClick={handleUpload}
                />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SendImage;
