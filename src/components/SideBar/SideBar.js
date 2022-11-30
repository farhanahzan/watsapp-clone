import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';

import Grid from '@mui/material/Grid';
import SideBarTop from './SideBarTop';
import SideBarSearch from './SideBarSearch';
import SideBarChat from './SideBarChat';

function SideBar() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [show, setShow] = useState(false)

  useEffect(() => {
    
    const unsubsribe =  db.collection('rooms').onSnapshot((snapshort) => {
        setRooms(
          snapshort.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      setTimeout(() => {
        setloading(false);
        setShow(true)
      }, 2000);

    return () => {
      unsubsribe()
      clearTimeout();
    };
  }, []);
  
  return (
    <Grid container>
      <Grid item xs={12} display="flex" alignItems="center" sx={{bgcolor:"primary.dark" , px:2, height:'12vh'}}>
        <SideBarTop />
      </Grid>

      <Grid item xs={12} sx={{ px: 2, py: 2, bgcolor: 'secondary.light',display:"flex", justifyContent:'center' }} >
        <SideBarSearch />
      </Grid>
   
      <Grid item xs={12}>
        {(loading ) && [...Array(6)].map((_,i)=><SideBarChat key={i} loading />)}
        {rooms.map((room) => (
         show && <SideBarChat
         
            key={room.id}
            id={room.id}
            name={room.data.name}
            photo={room.data.roomPhoto}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default SideBar;
