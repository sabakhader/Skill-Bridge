import React from 'react';
import { Container, Typography, Box, Paper, Grid, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              alt={user?.profile?.firstName || 'User'}
              src={user?.profile?.avatar}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {user?.profile?.firstName} {user?.profile?.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Profile details and settings coming soon!
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile; 