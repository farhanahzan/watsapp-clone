import React, { useState, createContext } from 'react';
import Grid from '@mui/material/Grid';
import ChatTop from './ChatTop';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import background_body from '../../assets/watapp_wallpaper1.jpg';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

import UseGetMsgCollections from '../../CustomHooks/useGetMsgCollection';
import UseGetSingleRoomDetails from '../../CustomHooks/UseGetSingleRoomDetails';
import useUsersInaGroup from '../../CustomHooks/useUsersInaGroup';
export const MessageContext = createContext();

function Chat() {
  const { roomId } = useParams();

  const [query, setQuery] = useState('');

  const roomData = UseGetSingleRoomDetails(roomId, db).data;
  const messages = UseGetMsgCollections(roomId, db).data;
  const usersinroom = useUsersInaGroup(roomId, db);

  return (
    <MessageContext.Provider value={{ messages, query, setQuery }}>
      <Grid
        container
        sx={{
          position: 'relative',
          height: '100%',
          alignContent: 'flex-start',
        }}
      >
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ bgcolor: 'primary.dark', height: '12vh', px: 2 }}
        >
          <ChatTop
            roomData={roomData}
            messages={messages}
            usersinroom={usersinroom}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: `url(${background_body})`,
            height: { xs: '100vh', sm: '70vh' },
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            py: '10px',
            px: '10px',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          }}
        >
          <ChatBody messages={messages} />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            position: 'relative',
            bottom: 0,
            bgcolor: 'secondary.light',
            width: '100%',
            px: 1,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '8vh',
          }}
        >
          <ChatFooter />
        </Grid>
      </Grid>
    </MessageContext.Provider>
  );
}

export default Chat;
