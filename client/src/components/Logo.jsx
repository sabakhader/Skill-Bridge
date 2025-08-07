import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = ({ variant = 'default', sx = {} }) => {
  const isLight = variant === 'light';
  
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        ...sx
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: isLight ? '#F5ECD5' : '#A4B465',
          color: isLight ? '#626F47' : '#F5ECD5',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          mr: 1
        }}
      >
        S
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: isLight ? '#F5ECD5' : '#626F47',
          textDecoration: 'none'
        }}
      >
        SkillBridge
      </Typography>
    </Box>
  );
};

export default Logo; 