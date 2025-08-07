import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminPortal = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Portal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Admin portal is under development. Check back soon for administrative features.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminPortal; 