import React, { useState, useContext } from 'react';
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { serverTimestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Picker from 'emoji-picker-react-2';
import { Box } from '@mui/system';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import SendImage from './SendImage';
import { LoginUserContext } from '../../App';

function ChatFooter() {
  const [input, setInput] = useState('');
  const [caption, setCaption] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState('');

  const { login } = useContext(LoginUserContext);

  const onEmojiClick = (event, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const { roomId } = useParams();

  const handleSubmit = (e, photourl) => {
    e.preventDefault();

    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add({
        imagecaption: '',
        message: input || photourl,
        name: login.displayName,
        timestamp: serverTimestamp(),
        userUID: login.uid,
      });

    setInput('');
  };
  const handlePhotoURL = (photourl) => {
    db.collection('rooms').doc(roomId).collection('messages').add({
      imagecaption: caption,
      message: photourl,
      name: login.displayName,
      timestamp: serverTimestamp(),
      userUID: login.uid,
    });
    setCaption('');
    setShow(false);
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setShow(true);
  };
  // console.log(file);
  const handleUpload = () => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, `/chats/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          handlePhotoURL(url);
        });
      }
    );
  };

  return (
    <>
      {showPicker ? (
        <Box sx={{ width: '350px', position: 'absolute', bottom: '53px' }}>
          <Picker
            preload={true}
            disableSkinTonePicker={true}
            native={true}
            disableAutoFocus={true}
            onEmojiClick={onEmojiClick}
          />
        </Box>
      ) : null}
      {show && (
        <SendImage
          show={show}
          setShow={setShow}
          file={file}
          handleUpload={handleUpload}
          setCaption={setCaption}
        />
      )}
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', textAlign: 'center' }}
      >
        <FormControl
          variant="standard"
          sx={{
            bgcolor: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 10,
            boxShadow: 4,
            width: '95%',
          }}
        >
          <Input
            startAdornment={
              <InputAdornment position="start">
                <MoodRoundedIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setShowPicker((val) => !val)}
                />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {input ? (
                  <SendRoundedIcon
                    onClick={handleSubmit}
                    sx={{ cursor: 'pointer' }}
                  />
                ) : (
                  <IconButton
                    sx={{ padding: 1 }}
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      onChange={handleFile}
                      accept="image/*"
                      type="file"
                    />
                    <AttachFileRoundedIcon />
                  </IconButton>
                )}
              </InputAdornment>
            }
            sx={{ fontSize: 14, width: '100%' }}
            placeholder="Type the message"
            type="text"
            disableUnderline={true}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button type="submit" sx={{ display: 'none' }}>
          SEND
        </Button>
      </form>

      <MicRoundedIcon />
    </>
  );
}

export default ChatFooter;
