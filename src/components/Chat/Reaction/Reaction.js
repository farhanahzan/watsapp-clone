import { Stack } from '@mui/system';
import React, { useMemo, useState } from 'react';

export const Reaction = ({ emoji }) => {
  const divStyle = {
    fontSize: '13px',

    paddingLeft: '3px',
    paddingRight: '5px',
    paddingBottom: '1px',
    paddingTop: '0px',
    borderRadius: '10px',
    backgroundColor: '#9996966e',
    marginTop: '0px',
    margiRight: '5px',
    boxShadow:
      'inset 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  };
  const spanStyle = {
    fontSize: '12px',
    fontWeight: 600,
    paddingLeft: '2px',
    paddingRight: '0px',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    color: 'rgb(198 198 198)',
  };

  const [countEmotion, setCountEmotion] = useState({
    thumpup: 0,
    heart: 0,
    smile: 0,
    angry: 0,
  });

  useMemo(() => {
    if (emoji.length > 0) {
      const getCountHeart = emoji.filter((em) => {
        return em.data.emotion === 'heart';
      });
      const getCountSmile = emoji.filter((em) => {
        return em.data.emotion === 'smile';
      });
      const getCountthumpup = emoji.filter((em) => {
        return em.data.emotion === 'thumpup';
      });
      const getCountangry = emoji.filter((em) => {
        return em.data.emotion === 'angry';
      });
      setCountEmotion((prev) => ({
        ...prev,
        heart: getCountHeart.length,
      }));
      setCountEmotion((prev) => ({
        ...prev,
        smile: getCountSmile.length,
      }));
      setCountEmotion((prev) => ({
        ...prev,
        thumpup: getCountthumpup.length,
      }));
      setCountEmotion((prev) => ({
        ...prev,
        angry: getCountangry.length,
      }));
    }
  }, [emoji]);

  return (
    <Stack flexDirection="row" sx={{ marginTop: '5px' }}>
      {countEmotion.thumpup > 0 ? (
        <div style={{ ...divStyle }}>
          👍<span style={{ ...spanStyle }}>{countEmotion.thumpup}</span>
        </div>
      ) : null}
      {countEmotion.heart > 0 ? (
        <div style={{ ...divStyle }}>
          ❤️<span style={{ ...spanStyle }}>{countEmotion.heart}</span>
        </div>
      ) : null}
      {countEmotion.smile > 0 ? (
        <div style={{ ...divStyle }}>
          😂<span style={{ ...spanStyle }}>{countEmotion.smile}</span>
        </div>
      ) : null}
      {countEmotion.angry > 0 ? (
        <div style={{ ...divStyle }}>
          😡<span style={{ ...spanStyle }}>{countEmotion.angry}</span>
        </div>
      ) : null}
    </Stack>
  );
};
