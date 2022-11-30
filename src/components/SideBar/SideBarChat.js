import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

function SideBarChat({ id, name, photo, loading }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  return (
    <Link to={`/rooms/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          borderRadius: 0,
          boxShadow: 0,
          ':hover': {
            backgroundColor: 'hover.main',
            color: 'white',
          },
        }}
      >
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar
                sx={{
                  border: 2,
                  borderColor: 'secondary.light',
                  boxShadow: 2,
                  width: 40,
                  height: 40,
                }}
                alt={name}
                src={photo}
              />
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Typography noWrap={true} sx={{ fontWeight: 600, fontSize: 16 }} gutterBottom>
                {name}
              </Typography>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              <Typography noWrap={true} sx={{ fontWeight: 400, fontSize: 14 }}>
                {message[0]?.message}
              </Typography>
            )
          }
        />
      </Card>
    </Link>
  );
}

export default SideBarChat;
