import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, Typography, AppBar, Toolbar, Button, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from './context/AuthContext';
import theme from './theme';
import Logo from './components/Logo';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Community from './pages/Community';
import Invest from './pages/Invest';
import Courses from './pages/Courses';
import NotFound from './pages/NotFound';
import HireFreelancer from './pages/HireFreelancer';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

// Navigation Component
const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ bgcolor: '#626F47', boxShadow: 'none' }}>
      <Toolbar>
        <Logo variant="light" sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            component={Link}
            to="/hire"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 500,
              color: '#F5ECD5',
              '&:hover': {
                backgroundColor: 'rgba(245, 236, 213, 0.1)'
              }
            }}
          >
            Hire Freelancers
          </Button>
          <Button
            color="inherit"
            component="a"
            href="https://skillbridge-edited-sandbox.mxapps.io/index.html?profile=Responsive"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 500,
              color: '#F5ECD5',
              '&:hover': {
                backgroundColor: 'rgba(245, 236, 213, 0.1)'
              }
            }}
          >
            About Us
          </Button>
          <Button
            color="inherit"
            component="a"
            href="https://contactus107-sandbox.mxapps.io/index.html?profile=Responsive"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 500,
              color: '#F5ECD5',
              '&:hover': {
                backgroundColor: 'rgba(245, 236, 213, 0.1)'
              }
            }}
          >
            Contact
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/community"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 500,
              color: '#F5ECD5',
              '&:hover': {
                backgroundColor: 'rgba(245, 236, 213, 0.1)'
              }
            }}
          >
            Community
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/invest"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 500,
              color: '#F5ECD5',
              '&:hover': {
                backgroundColor: 'rgba(245, 236, 213, 0.1)'
              }
            }}
          >
            Invest
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/courses"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 500,
              color: '#F5ECD5',
              '&:hover': {
                backgroundColor: 'rgba(245, 236, 213, 0.1)'
              }
            }}
          >
            Courses
          </Button>

          {user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 500,
                  color: '#F5ECD5',
                  '&:hover': {
                    backgroundColor: 'rgba(245, 236, 213, 0.1)'
                  }
                }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                onClick={logout}
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 500,
                  color: '#F5ECD5',
                  '&:hover': {
                    backgroundColor: 'rgba(245, 236, 213, 0.1)'
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/signin"
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 500,
                  color: '#F5ECD5',
                  '&:hover': {
                    backgroundColor: 'rgba(245, 236, 213, 0.1)'
                  }
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 500,
                  color: '#F5ECD5',
                  '&:hover': {
                    backgroundColor: 'rgba(245, 236, 213, 0.1)'
                  }
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

// Footer Component
const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
      bgcolor: 'background.paper',
      mt: 'auto',
      borderTop: '1px solid',
      borderColor: 'divider',
      color: 'text.secondary',
      fontSize: '0.875rem'
    }}
  >
    <Container maxWidth="lg">
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} SkillBridge. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/hire" element={<HireFreelancer />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;