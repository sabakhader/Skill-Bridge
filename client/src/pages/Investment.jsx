import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Investment = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Investment Opportunities
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This feature is coming soon. Stay tuned for exciting investment opportunities!
        </Typography>
      </Box>
    </Container>
  );
};

export default Investment; 