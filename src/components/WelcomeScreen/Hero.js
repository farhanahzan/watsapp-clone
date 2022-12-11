import { Box, Typography, Stack } from '@mui/material';
import React from 'react';
import Typewriter from 'typewriter-effect';
function Hero() {
  return (
    <Box
      sx={{
        height: '90vh',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'secondary.light',
      }}
    >
      <Stack
        sx={{
          width: '70%',
          fontWeight: 300,
          borderRadius: '18px',
          background: '#ffffff',
          boxShadow: '10px 10px 30px #d9d9d9,10px 10px 30px #ffffff',
          py: 2,
          px: 4,
        }}
      >
        <Typography variant="h2" align="left">
          <Typewriter
            options={{
              strings: ['Have a Break'],
              autoStart: true,
              loop: true,
              delay: 75,
              pauseFor: 1000,
            }}
          />
        </Typography>
        <Typography variant="h2" align="right">
          <Typewriter
            options={{
              strings: ['Have a Chat'],
              autoStart: true,
              loop: true,
              delay: 75,
              pauseFor: 1000,
            }}
          />
        </Typography>
      </Stack>
      <Stack></Stack>
    </Box>
  );
}

export default Hero;
