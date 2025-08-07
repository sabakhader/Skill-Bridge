import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
          About SkillBridge
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'background.paper' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                SkillBridge connects talented individuals with opportunities to grow, learn, and succeed. 
                We believe in creating a platform where skills meet opportunity, fostering a community of 
                continuous learning and professional development.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'background.paper' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                We envision a world where access to quality education and professional opportunities 
                knows no boundaries. Through our platform, we aim to bridge the gap between talent 
                and opportunity, creating a more inclusive and skilled global workforce.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, mt: 4, bgcolor: 'background.paper' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Why Choose SkillBridge?
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Expert-Led Learning
                    </Typography>
                    <Typography variant="body2">
                      Learn from industry professionals and gain practical knowledge.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Flexible Pathways
                    </Typography>
                    <Typography variant="body2">
                      Choose your learning path and pace that suits your goals.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Community Support
                    </Typography>
                    <Typography variant="body2">
                      Join a thriving community of learners and professionals.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs; 