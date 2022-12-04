import React from 'react';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import IconButton from '@mui/material/IconButton';

function ChatTop({ roomData, messages }) {
  //console.log('message', messages)
  return (
    <>
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
                  ? messages[messages.length - 1].timestamp
                    ? new Date(
                        messages[messages.length - 1]?.timestamp?.toDate()
                      ).toLocaleTimeString()
                    : 'Mon, 01 Jan 2022 00:00:00 GMT'
                  : 'not available'}
              </Typography>
            }
          />
        </Card>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="flex-end">
        <IconButton>
          <SearchRoundedIcon sx={{ color: 'secondary.light' }} />
        </IconButton>
        <IconButton>
          <AttachFileRoundedIcon sx={{ color: 'secondary.light' }} />
        </IconButton>
        <IconButton>
          <MoreVertRoundedIcon sx={{ color: 'secondary.light' }} />
        </IconButton>
      </Grid>
    </>
  );
}

export default ChatTop;
