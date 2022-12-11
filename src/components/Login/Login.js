import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import loginSvg from '../../assets/login.svg';
import logo from '../../assets/logo.png';
import Googleicon from '../../assets/googleicon.svg';

import React from 'react';
import { auth, provider } from '../../firebase';
import { Box } from '@mui/system';

function Login({ setLogin }) {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        sessionStorage.setItem('user', JSON.stringify(result.user));
        setLogin(result.user);
      })
      .catch((err) => alert(err.message));
  };
  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          py: 6,
          bgcolor: 'hover.main',
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'flex-start' },
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <img
          style={{ objectFit: 'scale-down', width: '70%' }}
          src={logo}
          alt="logo"
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: 300, color: 'secondary.light' }}
        >
          Welcome to{' '}
          <Typography sx={{ fontWeight: 600 }} component="span" variant="h6">
            TETE A TETE
          </Typography>
        </Typography>
        <Button
          onClick={signIn}
          sx={{
            boxShadow: 2,
            px: 1.5,
            mt: 15,
            borderRadius: 25,
            fontWeight: '500',
            bgcolor: 'secondary.light',
            color: 'hover.main',
            '&:hover': {
              bgcolor: 'primary.dark',
              color: 'secondary.light',
              fontWeight: '600',
            },
          }}
          size="large"
          variant="contained"
          startIcon={<img width="32px" src={Googleicon} alt="google icon" />}
        >
          Sign in with Google
        </Button>
      </Grid>
      <Grid
        component={Box}
        item
        display={{ xs: 'none', sm: 'flex' }}
        xs={12}
        sm={6}
        sx={{
          justifyContent: 'center',
          padding: 1,
          backgroundColor: 'neutral1.light',
        }}
      >
        <img width="100%" src={loginSvg} alt="login" />
      </Grid>
    </Grid>
  );
}

export default Login;
