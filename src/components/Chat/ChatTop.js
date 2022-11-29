import React from 'react';
import Grid from '@mui/material/Grid';
import SideBarChat from '../SideBar/SideBarChat';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import IconButton from '@mui/material/IconButton';

function ChatTop() {
  return (
    <>
      <Grid item xs={8} >
        <Card
          sx={{
            borderRadius: 0,
            boxShadow: 0,
            bgcolor:"primary.dark",
            padding:0
          }}
        >
          <CardHeader
          sx={{padding:0}}
            avatar={
              <Avatar
                sx={{
                  boxShadow: 4,
                  width: 46,
                  height: 46,
                }}
                alt="name"
                src=""
              />
            }
            title={
              <Typography
                
                sx={{ fontWeight: 400, fontSize:16, color:"primary.contrastText"}}
                gutterBottom
              >
                Kamal hasan fans club
              </Typography>
            }
            subheader={
              <Typography sx={{ fontWeight: 400, fontSize: 14,color:"primary.contrastText" }}>
                last seen
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
