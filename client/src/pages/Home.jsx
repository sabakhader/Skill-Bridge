import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Avatar,
  Chip,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#A4BE7B',
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const Home = () => {
  // Sample data - Replace with actual data from your backend
  const successfulStartups = [
    {
      name: 'BioTec',
      logo: '/path/to/logo1.png',
      description: 'Innovative biotech solutions for sustainable agriculture'
    },
    {
      name: 'TechDirect',
      logo: '/path/to/logo2.png',
      description: 'Direct-to-consumer technology marketplace'
    },
    {
      name: 'Penny',
      logo: '/path/to/logo3.png',
      description: 'AI-powered personal finance management platform'
    }
  ];

  const featuredCourses = [
    {
      title: 'Business Model Canvas',
      image: '/path/to/course1.jpg',
      description: 'Learn how to create and validate your business model',
      category: 'Business'
    },
    {
      title: 'Digital Marketing Strategy',
      image: '/path/to/course2.jpg',
      description: 'Master digital marketing channels and strategies',
      category: 'Marketing'
    },
    {
      title: 'Product Development',
      image: '/path/to/course3.jpg',
      description: 'From idea to market-ready product',
      category: 'Product'
    },
    {
      title: 'Startup Finance',
      image: '/path/to/course4.jpg',
      description: 'Financial planning and management for startups',
      category: 'Finance'
    }
  ];

  const startupInvestments = [
    {
      name: 'EcoTech Solutions',
      image: '/path/to/startup1.jpg',
      description: 'Sustainable technology solutions for businesses',
      raised: '75%',
      target: '$500K'
    },
    {
      name: 'HealthAI',
      image: '/path/to/startup2.jpg',
      description: 'AI-powered healthcare diagnostics',
      raised: '60%',
      target: '$750K'
    },
    {
      name: 'SmartRetail',
      image: '/path/to/startup3.jpg',
      description: 'Next-generation retail automation',
      raised: '85%',
      target: '$300K'
    },
    {
      name: 'FinLearn',
      image: '/path/to/startup4.jpg',
      description: 'Financial education platform',
      raised: '45%',
      target: '$250K'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
            SkillBridge
          </Typography>
          <Typography variant="h5" align="center">
            Connecting Skills with Opportunities
          </Typography>
        </Container>
      </HeroSection>

      {/* Successful Startups Section */}
      <Container sx={{ mb: 8 }}>
        <SectionTitle variant="h4">
          Our Successful Startups
        </SectionTitle>
        <Grid container spacing={4}>
          {successfulStartups.map((startup, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={0}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={startup.logo}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Typography variant="h6">{startup.name}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {startup.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mission Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto' }}>
            At SkillBridge, we're dedicated to empowering entrepreneurs and connecting talented individuals 
            with opportunities to grow, learn, and succeed. Our platform brings together skills, innovation, 
            and investment to create a thriving ecosystem for startups and professionals.
          </Typography>
        </Container>
      </Box>

      {/* Explore Courses Section */}
      <Container sx={{ mb: 8 }}>
        <SectionTitle variant="h4">
          Explore Courses
        </SectionTitle>
        <Grid container spacing={4}>
          {featuredCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.image}
                  alt={course.title}
                />
                <CardContent>
                  <Chip label={course.category} size="small" sx={{ mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={Link}
            to="/courses"
            variant="contained"
            size="large"
          >
            View All Courses
          </Button>
        </Box>
      </Container>

      {/* Invest in Startups Section */}
      <Container sx={{ mb: 8 }}>
        <SectionTitle variant="h4">
          Invest in Startups
        </SectionTitle>
        <Grid container spacing={4}>
          {startupInvestments.map((startup, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={startup.image}
                  alt={startup.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {startup.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {startup.description}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={`Raised: ${startup.raised}`} size="small" color="primary" />
                    <Chip label={`Target: ${startup.target}`} size="small" variant="outlined" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={Link}
            to="/invest"
            variant="contained"
            size="large"
          >
            View All Opportunities
          </Button>
        </Box>
      </Container>

      {/* Community Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container>
          <SectionTitle variant="h4">
            Community
          </SectionTitle>
          <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Join our vibrant community of entrepreneurs, investors, and professionals.
            Share knowledge, find opportunities, and grow together.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={Link}
              to="/community"
              variant="contained"
              size="large"
            >
              Join Our Community
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 