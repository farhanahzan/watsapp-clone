import { Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ToolTip from './ToolTip/ToolTip';
import PlaceholdeImg from '../../assets/placeholder.png';
import PregressiveImage from '../Image Compresion/PregressiveImage';
import { Reaction } from './Reaction/Reaction';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

function ChatMessage({ msg, login, id, handleImagePreview }) {
  const { roomId } = useParams();

  const [emoji, setEmoji] = useState({
    id: '',
    data: {
      emotion: '',
      name: '',
      uid: '',
    },
  });

  useEffect(() => {
    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .doc(msg.id)
      .collection('reaction')
      .onSnapshot((snapshot) =>
        setEmoji(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [roomId, msg.id]);
  return (
    <Stack
      direction="column"
      alignItems={msg.data.userUID === login.uid ? 'flex-end' : 'flex-start'}
      spacing={0}
    >
      <ToolTip
        place={
          msg.data.userUID === login.uid
            ? id === 0
              ? 'left'
              : 'left-end'
            : id === 0
            ? 'right'
            : 'right-end'
        }
        id={id + 'abc'}
        emoji={emoji}
        setEmoji={setEmoji}
        message={msg}
      >
        <Paper
          elevation={1}
          sx={{
            minWidth: '220px',
            mt: 2,
            px: 0,
            py: 0.2,
            borderRadius: '10px',
            bgcolor: `${
              msg.data.userUID === login.uid ? '#075e54' : '#5e0707'
            }`,
            position: 'relative',
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
            {msg.data.name}
          </Typography>
          {msg.data.message.includes(
            'https://firebasestorage.googleapis.com/v0/b/watsapp-clone-60f2d.appspot.com/o/chats'
          ) ? (
            <>
              <div
                onClick={() => {
                  handleImagePreview(msg.data.message);
                }}
              >
                <PregressiveImage
                  style={{
                    maxWidth: '250px',
                    objectFit: 'scale-down',
                    background: '#ffffff',
                    pointerEvents: 'all',
                  }}
                  imgSrc={msg.data.message}
                  previewSrc={PlaceholdeImg}
                />
              </div>

              <Typography
                variant="body2"
                sx={{
                  paddingLeft: 1,
                  color: '#ece5dd',
                  maxWidth: '220px',
                  overflowWrap: 'anywhere',
                }}
              >
                {msg.data.imagecaption ? msg.data.imagecaption : null}
              </Typography>
            </>
          ) : (
            <Typography
              variant="subtitle1"
              sx={{
                maxWidth: '50vw',
                px: 1,
                fontWeight: 300,
                color: 'secondary.light',
                overflowWrap: 'anywhere',
                lineHeight: '1.2rem',
              }}
            >
              {msg.data.message}{' '}
            </Typography>
          )}
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
            sx={{ paddingLeft: 0.5, paddingBottom: 0.3, paddingRight: 1 }}
          >
            <Reaction emoji={emoji} />
            <Typography
              variant="body1"
              align="right"
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                color: '#ece5dd',
                lineHeight: 1,
              }}
            >
              {msg.data.timestamp
                ? new Date(msg.data?.timestamp?.toDate()).toLocaleTimeString()
                : '00:00:00 AM'}
            </Typography>
          </Stack>
        </Paper>
      </ToolTip>
    </Stack>
  );
}

export default ChatMessage;
