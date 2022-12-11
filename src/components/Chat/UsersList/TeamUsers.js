import { EmailRounded } from '@mui/icons-material';
import userimage from '../../../assets/user.png';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function TeamUsers({ usersinroom, show, setShow }) {
  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Room Members</DialogTitle>
      <DialogContent
        sx={{
          overflowY: 'scroll',
          height: '32vh',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}
      >
        <List
          dense
          sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
        >
          {usersinroom.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton
                  href={`mailto:${user.data.email}`}
                  edge="end"
                  aria-label="email"
                >
                  <EmailRounded />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <img
                    style={{ width: '100%', objectFit: 'cover' }}
                    src={user.data.photoURL}
                    alt=""
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.data.displayName}
                secondary={user.data.lastLoginAt}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShow(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
