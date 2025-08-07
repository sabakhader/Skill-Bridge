import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName}!
        </Typography>
        
        <Grid container spacing={3}>
          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Active Projects
              </Typography>
              <Typography variant="h3" sx={{ mt: 2 }}>
                0
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 'auto' }}
              >
                View Projects
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Learning Progress
              </Typography>
              <Typography variant="h3" sx={{ mt: 2 }}>
                0%
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 'auto' }}
              >
                Continue Learning
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Messages
              </Typography>
              <Typography variant="h3" sx={{ mt: 2 }}>
                0
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 'auto' }}
              >
                View Messages
              </Button>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography color="text.secondary">
                No recent activity to display.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 