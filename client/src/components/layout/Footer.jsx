import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800]
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              SkillBridge
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connecting talented freelancers with innovative entrepreneurs.
              Build your future with SkillBridge.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link
                component={RouterLink}
                to="/projects"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                Browse Projects
              </Link>
              <Link
                component={RouterLink}
                to="/freelancers"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                Find Freelancers
              </Link>
              <Link
                component={RouterLink}
                to="/how-it-works"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                How It Works
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link
                href="https://linkedin.com"
                color="text.secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </Link>
              <Link
                href="https://twitter.com"
                color="text.secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </Link>
              <Link
                href="https://github.com"
                color="text.secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link component={RouterLink} to="/" color="inherit">
              SkillBridge
            </Link>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 