import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ... existing handlers ...

  const pages = [
    { title: 'Projects', path: '/projects' },
    { title: 'Freelancers', path: '/freelancers' },
    { title: 'Courses', path: '/courses' },
    { title: 'Community', path: '/community' },
    { title: 'Investment', path: '/investment' },
    ...(user?.role === 'entrepreneur' ? [{ title: 'Post Project', path: '/create-project' }] : []),
    ...(user?.role === 'freelancer' ? [{ title: 'My Services', path: '/my-services' }] : [])
  ];

  const settings = [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Profile', path: '/profile' },
    { title: 'Messages', path: '/messages' },
    { title: 'Notifications', path: '/notifications' }
  ];

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ... existing navbar structure ... */}
          
          {/* Add notification icons */}
          {user && (
            <Box sx={{ display: 'flex', mr: 2 }}>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>
          )}
          
          {/* ... rest of the navbar ... */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;