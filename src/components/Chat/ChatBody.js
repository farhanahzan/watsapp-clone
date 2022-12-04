import React, { useEffect, useRef, useContext } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { LoginUserContext } from '../../App';

function ChatBody({ messages }) {
  // console.log(messages.length > 0 && messages[0].name);

  // console.log(messages);
  // console.log(new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleTimeString())
  const messagesEndRef = useRef(null);
  const { login } = useContext(LoginUserContext);

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
          alignItems={
            msg.name === login.displayName ? 'flex-end' : 'flex-start'
          }
          spacing={0}
          key={id}
        >
          <Paper
            elevation={1}
            sx={{
              minWidth: '100px',
              mt: 2,
              px: 0,
              py: 0.2,
              borderRadius: '10px',
              bgcolor: `${
                msg.name === login.displayName ? '#075e54' : '#5e0707'
              }`,
            }}
          >
            <Typography
              variant="subtitle2"
              align="left"
              sx={{
                fontSize: '12px',
                fontWeight: 600,

                color: '#ece5dd',
                paddingLeft: 1,
              }}
            >
              {msg.name}
            </Typography>
            {msg.message.includes(
              'https://firebasestorage.googleapis.com/v0/b/watsapp-clone-60f2d.appspot.com/o/chats'
            ) ? (
              <>
                <img
                  style={{
                    maxWidth: '250px',
                    objectFit: 'scale-down',
                    background: '#ffffff',
                  }}
                  src={msg.message}
                  alt="chats"
                />
                <Typography
                  variant="body2"
                  sx={{
                    paddingLeft: 1,
                    color: '#ece5dd',
                  }}
                >
                  {msg.imagecaption ? msg.imagecaption : null}
                </Typography>
              </>
            ) : (
              <Typography
                variant="subtitle1"
                sx={{
                  px: 1,
                  fontWeight: 400,
                  color: 'secondary.light',
                }}
              >
                {msg.message}{' '}
              </Typography>
            )}

            <Typography
              variant="body1"
              align="right"
              sx={{
                paddingRight: 1,
                fontSize: '10px',
                fontWeight: 400,
                color: '#ece5dd',
              }}
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
