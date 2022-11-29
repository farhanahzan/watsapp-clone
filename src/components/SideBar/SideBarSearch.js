import React from 'react'
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SideBarSearch() {
  return (
   <><FormControl
   variant="standard"
   sx={{ bgcolor: 'white', px: 1.5, py: 0.5, borderRadius: 10, boxShadow:4 , width:'90%'}}
 >
   <Input
   sx={{fontSize:12, width:'100%'}}
     placeholder="Search the chat"
     type="search"
     disableUnderline={true}
     startAdornment={
       <InputAdornment position="start">
         <SearchRoundedIcon />
       </InputAdornment>
     }
   />
 </FormControl></>
  )
}

export default SideBarSearch