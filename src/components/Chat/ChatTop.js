import React from 'react';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

import IconButton from '@mui/material/IconButton';
import SearchMessage from './Search Message/SearchMessage';
import TeamUsers from './UsersList/TeamUsers';
import DeleteRoom from './DeleteRoom/DeleteRoom';

function ChatTop({ roomData, messages, usersinroom }) {
  const [show, setShow] = useState(false);
  return (
    <>
      {show ? (
        <Stack
          sx={{
            position: 'absolute',
            right: 0,
            top: '86px',
            zIndex: 3,
            backgroundColor: 'secondary.light',
            paddingTop: 1.5,
          }}
        >
          <TeamUsers usersinroom={usersinroom} show={show} setShow={setShow} />
        </Stack>
      ) : null}
      <Grid item xs={8}>
        <Card
          sx={{
            borderRadius: 0,
            boxShadow: 0,
            bgcolor: 'primary.dark',
            padding: 0,
          }}
        >
          <CardHeader
            sx={{ padding: 0 }}
            avatar={
              <Avatar
                sx={{
                  boxShadow: 4,
                  width: 46,
                  height: 46,
                }}
                alt={roomData.name}
                src={roomData.roomPhoto}
              />
            }
            title={
              <Typography
                noWrap={true}
                sx={{
                  fontWeight: 400,
                  fontSize: 16,
                  color: 'primary.contrastText',
                }}
                gutterBottom
              >
                {roomData.name}
              </Typography>
            }
            subheader={
              <Typography
                noWrap={true}
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'primary.contrastText',
                }}
              >
                last seen{' '}
                {messages.length > 0
                  ? messages[messages.length - 1].data.timestamp
                    ? new Date(
                        messages[messages.length - 1].data?.timestamp?.toDate()
                      ).toLocaleTimeString()
                    : 'Mon, 01 Jan 2022 00:00:00 GMT'
                  : 'not available'}
              </Typography>
            }
          />
        </Card>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="flex-end">
        <SearchMessage messages={messages.data} />
        <IconButton onClick={() => setShow(true)}>
          <PeopleAltRoundedIcon sx={{ color: 'secondary.light' }} />
        </IconButton>
        <DeleteRoom roomData={roomData} />
      </Grid>
    </>
  );
}

export default ChatTop;
