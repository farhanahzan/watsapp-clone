import React from 'react'
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';

function ChatFooter() {
  return (
   <>
   <MoodRoundedIcon/>
   <FormControl
   variant="standard"
   sx={{ bgcolor: 'white', px: 1.5, py: 0.5, borderRadius: 10, boxShadow:4 , width:'80%'}}
 >
   <Input
   sx={{fontSize:12, width:'100%'}}
     placeholder="Type the message"
     type="search"
     disableUnderline={true}
     
   />
 </FormControl>
<MicRoundedIcon/>

   </>
  )
}

export default ChatFooter