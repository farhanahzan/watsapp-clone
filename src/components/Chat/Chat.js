import React, { useState, useEffect, createContext, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import ChatTop from './ChatTop';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import background_body from '../../assets/watapp_wallpaper1.jpg';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
export const MessageContext = createContext();

function Chat() {
  const { roomId } = useParams();

  const [roomData, setRoomData] = useState('');
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshort) => setRoomData(snapshort.data()));

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [roomId]);

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
          <ChatTop roomData={roomData} messages={messages} />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: `url(${background_body})`,
            height: '71vh',
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
            position: 'absolute',
            bottom: 0,
            bgcolor: 'secondary.light',
            width: '100%',
            px: 1,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ChatFooter />
        </Grid>
      </Grid>
    </MessageContext.Provider>
  );
}

export default Chat;
