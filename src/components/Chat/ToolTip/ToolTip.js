import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { LoginUserContext } from '../../../App';

import React, { useContext, useState } from 'react';
import { Stack } from '@mui/system';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import 'firebase/compat/firestore';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    color: '#c8c8c8',
    boxShadow: theme.shadows[1],
    borderRadius: '25px',
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
  },
}));

export default function ToolTip({
  children,
  place,
  id,
  message,
  emoji,
  setEmoji,
}) {
  const { login } = useContext(LoginUserContext);

  const { roomId } = useParams();

  const [key, setKey] = useState(0);

  const verifyAlreadyReacted = () => {
    let verify = false;
    verify = emoji.some((item) => item.data.uid === login.uid);

    if (verify) {
      emoji.map((em, keys) => {
        if (em.data.uid === login.uid) {
          setKey(keys);
        }
      });
    }
    return verify;
  };
  const whenSameEmotion = (e) => {
    let verify = false;
    emoji.map((em) => {
      if ((em.data.uid === login.uid && em.data.emotion) === e.target.id) {
        verify = false;
      } else {
        verify = true;
      }
    });
    return verify;
  };
  const increace = (e) => {
    if (message.data.userUID !== login.uid && !verifyAlreadyReacted()) {
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .doc(message.id)
        .collection('reaction')
        .add({
          emotion: e.target.id,
          name: login.displayName,
          uid: login.uid,
        });
    } else if (
      message.data.userUID !== login.uid &&
      verifyAlreadyReacted() &&
      whenSameEmotion(e)
    ) {
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .doc(message.id)
        .collection('reaction')
        .doc(emoji[key].id)
        .update({
          emotion: e.target.id,
        })

        .catch((err) => console.log(err));
    } else {
      return;
    }
  };
  const style = {
    cursor: 'pointer',
    padding: '1px',
    fontSize: '20px',
    backgroundColor: 'transparent',
  };

  return (
    <LightTooltip
      title={
        <Stack flexDirection="column" sx={{ padding: 0 }}>
          <div id="angry" onClick={increace} style={{ ...style }}>
            😡
          </div>
          <div
            id="smile"
            onClick={increace}
            style={{
              ...style,
            }}
          >
            😂
          </div>
          <div
            id="heart"
            onClick={increace}
            style={{
              ...style,
            }}
          >
            ❤️
          </div>

          <div
            id="thumpup"
            onClick={increace}
            style={{
              ...style,
            }}
          >
            👍
          </div>
        </Stack>
      }
      placement={place}
      id={id}
    >
      {children}
    </LightTooltip>
  );
}
