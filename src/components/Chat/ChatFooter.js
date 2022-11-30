import React,{useState} from 'react'
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { db } from '../../firebase';
import {serverTimestamp} from 'firebase/firestore'
import {useParams} from 'react-router-dom'
function ChatFooter() {
const [input, setInput] = useState('')    
const {roomId} = useParams()
const handleSubmit = (e)=>{
  e.preventDefault()

db.collection('rooms').doc(roomId).collection('messages').add({
  message:input,
  name:'Aneek',
  timestamp:serverTimestamp()
})

setInput('')
}
  return (
   <>
   <MoodRoundedIcon/>
   <form onSubmit={handleSubmit} style={{width:'100%', textAlign:'center'}}>
   <FormControl
   variant="standard"
   sx={{ bgcolor: 'white', px: 1.5, py: 0.5, borderRadius: 10, boxShadow:4 , width:'95%'}}
 >
   <Input
   sx={{fontSize:14, width:'100%'}}
     placeholder="Type the message"
     type="search"
     disableUnderline={true}
     value={input}
     onChange={(e)=>setInput(e.target.value)}
   />
 </FormControl>
 <Button type="submit" sx={{display:'none'}}>
  primary
 </Button>
   </form>
   
<MicRoundedIcon/>

   </>
  )
}

export default ChatFooter