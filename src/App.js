import React, { useEffect, useState } from 'react';

import Chat from './components/Chat/Chat';
import SideBar from './components/SideBar/SideBar';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Hero from './components/WelcomeScreen/Hero';
import { db, auth } from './firebase';
export const LoginUserContext = React.createContext();

const theme = createTheme({
  palette: {
    primary: {
      light: '#4a5c81',
      main: '#1d3354',
      dark: '#000b2b',
      contrastText: '#ffffff',
    },
    neutral1: {
      light: '#76a4ca',
      main: '#467599',
      dark: '#0f4a6b',
      contrastText: '#ffffff',
    },
    neutral2: {
      light: '#d0ffff',
      main: '#9ed8db',
      dark: '#6ea6a9',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffffff',
      main: '#e9fff9',
      dark: '#b7ccc6',
      contrastText: '#000000',
    },
    error: {
      light: '#ff7370',
      main: '#d63f44',
      dark: '#9e001d',
      contrastText: '#ffffff',
    },
    hover: {
      light: '#585858',
      main: '#2f2f2f',
      dark: '#050505',
      contrastText: '#ffffff',
    },
  },
});

function App() {
  const [login, setLogin] = React.useState(
    sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : ''
  );
  const [allUsers, setAllUsers] = useState([]);
  const curruser = auth.currentUser;
  useEffect(() => {
    const unsubcribe = db.collection('users').onSnapshot((snapshot) => {
      setAllUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      unsubcribe();
    };
  }, []);
  const verifyUserAlreadyRegistered = () => {
    let verify = false;
    if (allUsers.length > 0) {
      verify = allUsers.some((item) => item.data.uid === login.uid);
    }
    return verify;
  };
  useEffect(() => {
    if (!verifyUserAlreadyRegistered() && allUsers.length > 0 && login) {
      if (curruser !== null) {
        db.collection('users')
          .add({
            displayName: curruser.displayName,
            email: curruser.email,
            lastLoginAt: curruser.metadata.lastSignInTime,
            createdAt: curruser.metadata.creationTime,
            photoURL: curruser.photoURL,
            uid: curruser.uid,
          })

          .catch((err) => console.log(err));
      }
    }
  }, [login, allUsers.length]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundImage:
            ' radial-gradient(circle, #6ea6a9, #59959e, #458393, #337288, #22617c, #185471, #0f4766, #083a5b, #042e4f, #022343, #001937, #000b2b)',
          height: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Grid
          container
          item
          sx={{
            backgroundColor: 'secondary.light',
            height: '90vh',
            boxShadow: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          sm={11}
          md={10}
          lg={8}
        >
          {!login ? (
            <Login setLogin={setLogin} />
          ) : (
            <LoginUserContext.Provider
              value={{ login, setLogin, allUsers, setAllUsers }}
            >
              <BrowserRouter>
                <Grid
                  item
                  xs={12}
                  sm={4.5}
                  md={4}
                  lg={4}
                  sx={{
                    borderRight: 1,
                    borderColor: 'secondary.dark',
                    height: '90vh',
                  }}
                >
                  <SideBar />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7.5}
                  md={8}
                  lg={8}
                  sx={{ height: '90vh' }}
                >
                  <Routes>
                    <Route path="/rooms/:roomId" element={<Chat />} />
                    <Route path="/" element={<Hero />} />
                  </Routes>
                </Grid>
              </BrowserRouter>
            </LoginUserContext.Provider>
          )}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
