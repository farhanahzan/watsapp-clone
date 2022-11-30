import Chat from './components/Chat/Chat';
import SideBar from './components/SideBar/SideBar';
import './App.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const theme = createTheme({
  palette:{
    primary:{
      light:'#4a5c81',
      main:'#1d3354',
      dark:'#000b2b',
      contrastText:'#ffffff'
    },
    neutral1:{
      light:'#76a4ca',
      main:'#467599',
      dark:'#0f4a6b',
      contrastText:'#ffffff'
    },
    neutral2:{
      light:'#d0ffff',
      main:'#9ed8db',
      dark:'#6ea6a9',
      contrastText:'#000000'
    },
    secondary:{
      light:'#ffffff',
      main:'#e9fff9',
      dark:'#b7ccc6',
      contrastText:'#000000'
    },
    error:{
      light:'#ff7370',
      main:'#d63f44',
      dark:'#9e001d',
      contrastText:'#ffffff'
    },
    hover:{
      light:'#585858',
      main:'#2f2f2f',
      dark:'#050505',
      contrastText:'#ffffff'
    }

  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>

    <Box sx={{ flexGrow: 1 , backgroundImage: ' radial-gradient(circle, #6ea6a9, #59959e, #458393, #337288, #22617c, #185471, #0f4766, #083a5b, #042e4f, #022343, #001937, #000b2b)', height:'100vh', display:'grid', placeItems:'center'}} >

      <Grid container item  sx={{backgroundColor:'secondary.main', height:'90vh', boxShadow:4, borderRadius:2 }}
      sm={11} md={10} lg={8}>
 <BrowserRouter>
        <Grid item xs={12} sm={4.5} md={4} lg={4} sx={{borderRight:1, borderColor:'secondary.dark'}} >
          <SideBar />
        </Grid>
        <Grid item xs={12} sm={7.5} md={8} lg={8}>
         
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat/>}/>
            <Route path="/" element={<Chat/>}/>
            <Route path="*" element={<Chat/>}/>


          </Routes>
        </Grid>
        </BrowserRouter>

      </Grid>
    </Box>
    </ThemeProvider>

  );
}

export default App;
