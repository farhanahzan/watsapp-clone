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
import UseGetCollections from './CustomHooks/UseGetCollections';
import UseVerifyAlreadyExists from './CustomHooks/UseVerifyAlreadyExists';
import FindCurrentUserId from './CustomHooks/FindCurrentUserId';
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
  const [login, setLogin] = useState(
    sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : ''
  );

  const curruser = auth.currentUser;
  const userData = UseGetCollections('users', db).data;
  const verifyUid = UseVerifyAlreadyExists(userData, login, 'uid');
  const findId = FindCurrentUserId(auth, userData);
  useEffect(() => {
    if (!verifyUid && userData.length > 0 && login) {
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
    if (findId) {
      db.collection('users')
        .doc(findId?.id)
        .update({
          lastLoginAt: curruser.metadata.lastSignInTime,
        })
        .catch((err) => console.log(err));
    }
  }, [login, userData.length, findId]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          background: '#FEAC5E',
          background:
            '-webkit-linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E)',
          background: 'linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E) ',

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
            height: { xs: '100vh', sm: '90vh' },
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
            <LoginUserContext.Provider value={{ login, setLogin }}>
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
                    height: { xs: '100vh', sm: '90vh' },
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
                  sx={{ height: { xs: '100vh', sm: '90vh' } }}
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
