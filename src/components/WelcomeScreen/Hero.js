import { Box, Typography, Stack } from '@mui/material';
import React from 'react';

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
        <Typography align="left" variant="h2">
          Have a Break
        </Typography>
        <Typography align="right" variant="h2">
          Have a Chat
        </Typography>
      </Stack>
      <Stack></Stack>
    </Box>
  );
}

export default Hero;
