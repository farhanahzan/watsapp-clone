import React, { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

function ChatBody({ messages }) {
  // console.log(messages.length > 0 && messages[0].name);

  // console.log(messages);
  // console.log(new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleTimeString())
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  //const [showRight, setShowRight] = useState('');

  return (
    <div>
      {messages.map((msg, id) => (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems={msg.name == 'farhan' ? 'flex-end' : 'flex-start'}
          spacing={0}
          key={id}
        >
          <Paper
            elevation={1}
            sx={{
              mt: 2,
              px: 1,
              py: 0.2,
              borderRadius: '10px',
              bgcolor: `${msg.name == 'farhan' ? 'secondary.main' : null}`,
            }}
          >
            <Typography
              variant="subtitle2"
              align="left"
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                borderBottom: '1px solid',
                borderBottomColor: '#f1f1f1',
                color: 'primary.main',
              }}
            >
              {msg.name}
            </Typography>

            {msg.message.includes(
              'https://firebasestorage.googleapis.com/v0/b/watsapp-clone-60f2d.appspot.com/o/chats'
            ) ? (
              <img
                style={{ maxWidth: '250px', objectFit: 'scale-down' }}
                src={msg.message}
                alt="chats"
              />
            ) : (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: 'hover.main' }}
              >
                {msg.message}{' '}
              </Typography>
            )}

            <Typography
              variant="body1"
              align="right"
              sx={{ fontSize: '12px', fontWeight: 600, color: 'hover.light' }}
            >
              {msg.timestamp
                ? new Date(msg?.timestamp?.toDate()).toLocaleTimeString()
                : '00:00:00 AM'}
            </Typography>
          </Paper>
        </Stack>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatBody;
