import { Box, Typography } from '@mui/material';
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
      <Typography
        align="center"
        variant="h2"
        sx={{
          width: '70%',
          fontWeight: 300,
          borderRadius: '18px',
          background: '#ffffff',
          boxShadow: '20px 20px 60px #d9d9d9,20px -20px 60px #ffffff',
          py: 2,
          px: 2,
        }}
      >
        Have a Break,Have a Chat
      </Typography>
    </Box>
  );
}

export default Hero;
