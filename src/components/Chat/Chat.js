import React from 'react'
import Grid from '@mui/material/Grid';
import ChatTop from './ChatTop';


function Chat() {
  return (
   <Grid container>
    <Grid item xs={12}  display="flex" alignItems="center" justifyContent="space-between" sx={{bgcolor:"primary.dark", height:"12vh", px:2}}>
    <ChatTop/>

    </Grid>
   </Grid>
  )
}

export default Chat