import { Box, Typography, Link } from '@mui/material';

export default function Contact() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1">
        This page is integrated via Mendix.{' '}
        <Link 
          href="https://mendix-app.com/contact" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Open in Mendix
        </Link>
      </Typography>
    </Box>
  );
}
