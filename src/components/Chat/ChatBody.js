import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

function ChatBody({ messages }) {
  // console.log(messages.length > 0 && messages[0].name);

  // console.log(messages);
  // console.log(new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleTimeString())

  const [showRight, setShowRight] = useState('');

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
          <Paper elevation={1} sx={{mt:2, px: 1, py: 0.2, borderRadius: '10px', bgcolor:`${msg.name=="farhan"?"secondary.main":null}` }}>
            <Typography
              variant="subtitle2"
              align="left"
              sx={{
                fontSize:'12px',
                fontWeight: 600,
                borderBottom: '1px solid',
                borderBottomColor: '#f1f1f1',
                color: 'primary.main',
              }}
            >
              {msg.name}
            </Typography>

            <Typography variant="subtitle1" sx={{fontWeight: 600,color:'hover.main'}}>{msg.message} </Typography>
            <Typography
              variant="body1"
              align="right"
              sx={{ fontSize: '12px', fontWeight: 600, color: 'hover.light' }}
            >
              {new Date(
                msg?.timestamp?.toDate()
              ).toLocaleTimeString()}
            </Typography>
          </Paper>
        </Stack>
      ))}
    </div>
  );
}

export default ChatBody;
