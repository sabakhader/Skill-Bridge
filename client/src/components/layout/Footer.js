import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  GitHub,
} from '@mui/icons-material';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { text: 'About Us', path: '/about' },
        { text: 'Contact', path: '/contact' },
        { text: 'Careers', path: '/careers' },
        { text: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Find Freelancers', path: '/freelancers' },
        { text: 'Post Project', path: '/projects/new' },
        { text: 'Browse Courses', path: '/courses' },
        { text: 'Investment', path: '/investment' },
      ],
    },
    {
      title: 'Community',
      links: [
        { text: 'Community Hub', path: '/community' },
        { text: 'Success Stories', path: '/success-stories' },
        { text: 'Events', path: '/events' },
        { text: 'Help Center', path: '/help' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', path: '/privacy' },
        { text: 'Terms of Service', path: '/terms' },
        { text: 'Cookie Policy', path: '/cookies' },
        { text: 'Security', path: '/security' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com' },
    { icon: <Twitter />, url: 'https://twitter.com' },
    { icon: <LinkedIn />, url: 'https://linkedin.com' },
    { icon: <Instagram />, url: 'https://instagram.com' },
    { icon: <GitHub />, url: 'https://github.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.title}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="inherit"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            mb={3}
          >
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>

          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 