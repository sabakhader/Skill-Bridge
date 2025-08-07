import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  Stack,
  Divider
} from '@mui/material';

const About = () => {
  const teamMembers = [
    {
      name: 'Tasneem Aldwaikat',
      role: 'Founder & CEO',
      image: '/path/to/image1.jpg',
      description: 'Leading the vision and strategy of SkillBridge.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Technology',
      image: '/path/to/image2.jpg',
      description: 'Driving technological innovation and platform development.'
    },
    {
      name: 'Michael Chen',
      role: 'Community Manager',
      image: '/path/to/image3.jpg',
      description: 'Building and nurturing our vibrant community.'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        {/* Mendix Integration */}
        <Box sx={{ mb: 8, width: '100%', height: '600px', overflow: 'hidden' }}>
          <iframe
            src="https://skillbridge-edited-sandbox.mxapps.io/index.html?profile=Responsive"
            title="SkillBridge Mendix About Page"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          />
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            About SkillBridge
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Connecting Skills with Opportunities
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
            SkillBridge is a revolutionary platform that connects skilled professionals with businesses, 
            facilitates learning through expert-led courses, and enables investment in promising startups.
          </Typography>
        </Box>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'background.paper' }}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1">
                To empower individuals and businesses by creating a seamless platform for skill development, 
                professional networking, and growth opportunities. We believe in fostering a community where 
                talent meets opportunity, and innovation drives success.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'background.paper' }}>
              <Typography variant="h4" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1">
                To become the world's leading platform for professional development and business growth, 
                where every individual can access the resources they need to succeed, and every business 
                can find the talent they need to thrive.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Values */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
            Our Values
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Innovation
                  </Typography>
                  <Typography variant="body2">
                    Constantly pushing boundaries and embracing new technologies to provide the best solutions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Excellence
                  </Typography>
                  <Typography variant="body2">
                    Striving for the highest quality in everything we do.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Community
                  </Typography>
                  <Typography variant="body2">
                    Building strong relationships and fostering collaboration.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Integrity
                  </Typography>
                  <Typography variant="body2">
                    Maintaining transparency and ethical practices in all operations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Team Section */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack direction="column" alignItems="center" spacing={2}>
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        sx={{ width: 120, height: 120, mb: 2 }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {member.role}
                      </Typography>
                      <Typography variant="body2" textAlign="center">
                        {member.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
