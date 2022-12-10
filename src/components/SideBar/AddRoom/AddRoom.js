import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';

import { db, storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, IconButton } from '@mui/material';

function AddRoom({ show, setShow }) {
  //const [open, setOpen] = React.useState(true);

  const checkUpload = useRef(0);
  const previous_image = useRef([]);

  const [data, setData] = useState({
    name: '',
    photo: '',
    file: '',
    file_preview: '',
    alert: false,
  });
  const handleFile = (e) => {
    setData((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
    setData((prevState) => ({
      ...prevState,
      file_preview: URL.createObjectURL(e.target.files[0] || data.file),
    }));
    setData((prevState) => ({
      ...prevState,
      alert: false,
    }));
  };
  const handleDelete = (filename) => {
    const storageRef = storage.ref();
    const deleteRef = storageRef.child(`files/${filename}`);

    deleteRef.delete().catch((error) => {
      console.log(error);
    });
  };
  const handleUpload = () => {
    if (!data.file) {
      setData((prevState) => ({
        ...prevState,
        alert: true,
      }));
      return;
    }

    previous_image.current.push(data.file.name);
    if (checkUpload.current > 0) {
      handleDelete(previous_image.current[0]);
      previous_image.current.shift();
    }
    checkUpload.current = checkUpload.current + 1;

    const storageRef = ref(storage, `/files/${data.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data.file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        var percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setData((prevState) => ({
            ...prevState,
            photo: url,
          }));
        });
      }
    );
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = () => {
    if (data.name.length > 0 && data.photo.length > 0 && data.file) {
      db.collection('rooms').add({
        name: data.name,
        roomPhoto: data.photo,
      });
    } else if (data.name.length === 0 && data.photo.length > 0) {
      handleDelete(data.file.name);
    }
    setShow(data.photo ? false : true);
    checkUpload.current = 0;
    previous_image.current = [];
  };

  const nameHandler = (e) => {
    setData((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const editIconHandler = () => {
    setData((prevState) => ({
      ...prevState,
      file_preview: '',
    }));
    console.log('called');
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>
        ADD NEW ROOM
      </DialogTitle>

      {data.alert && <Alert severity="error">File not selected yet!</Alert>}
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            width: 180,
            height: 180,
            border: 2,
            borderColor: 'secondary.light',
            boxShadow: 2,
          }}
          alt="Room Profile Image"
          component="div"
        >
          <IconButton
            sx={{ width: 180, height: 180 }}
            aria-label="upload picture"
            component="label"
          >
            <>
              <input
                hidden
                onChange={handleFile}
                accept="image/*"
                type="file"
              />

              {!data.file_preview ? (
                <AddPhotoAlternateRoundedIcon
                  sx={{ fontSize: 80, color: 'secondary.light' }}
                />
              ) : (
                <>
                  <ModeRoundedIcon
                    onClick={editIconHandler}
                    sx={{
                      fontSize: 25,
                      color: '#ffffffd1',
                      position: 'absolute',
                      zIndex: 2,
                      boderRadius: '25px',
                      padding: '77px',
                      backgroundColor: '#00000059',
                    }}
                  />{' '}
                  <img
                    src={data.file_preview && data.file_preview}
                    alt="room profile"
                    style={{ width: 180, height: 180 }}
                  />
                </>
              )}
            </>
          </IconButton>
        </Avatar>

        {data.file ? (
          <Button
            variant="contained"
            component="label"
            onClick={handleUpload}
            endIcon={
              <CheckCircleRoundedIcon
                sx={{ color: data.photo.length > 0 ? '#3fd670' : 'error.main' }}
              />
            }
          >
            Click to Upload
          </Button>
        ) : null}
        <TextField
          autoFocus
          margin="dense"
          id="roomName"
          label="Room Name"
          type="text"
          fullWidth
          required
          variant="outlined"
          value={data.name}
          onChange={nameHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create a room</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddRoom;
