import React, { useState } from 'react';
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
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Business,
  School,
  People,
  AttachMoney,
  ContactMail,
  Info,
  Dashboard,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };

  const mainMenuItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'Projects', path: '/projects', icon: <Business /> },
    { text: 'Courses', path: '/courses', icon: <School /> },
    { text: 'Community', path: '/community', icon: <People /> },
    { text: 'Investment', path: '/investment', icon: <AttachMoney /> },
  ];

  const userMenuItems = user ? [
    { text: 'Dashboard', path: '/dashboard', action: () => navigate('/dashboard') },
    { text: 'Profile', path: `/profile/${user._id}`, action: () => navigate(`/profile/${user._id}`) },
    ...(user.role === 'admin' ? [{ text: 'Admin Portal', path: '/admin', action: () => navigate('/admin') }] : []),
    { text: 'Logout', action: handleLogout },
  ] : [];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SkillBridge
      </Typography>
      <List>
        {mainMenuItems.map((item) => (
          <ListItem key={item.text} component={RouterLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem 
          component="a" 
          href="https://skillbridge-edited-sandbox.mxapps.io/index.html?profile=Responsive"
          sx={{ 
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem 
          component="a" 
          href="https://contactus107-sandbox.mxapps.io/index.html?profile=Responsive"
          sx={{ 
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <ListItemIcon><ContactMail /></ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SkillBridge
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {mainMenuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                component="a"
                href="https://skillbridge-edited-sandbox.mxapps.io/index.html?profile=Responsive"
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  textTransform: 'none', 
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(245, 236, 213, 0.1)'
                  }
                }}
                startIcon={<Info />}
              >
                About Us
              </Button>
              <Button
                component="a"
                href="https://contactus107-sandbox.mxapps.io/index.html?profile=Responsive"
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  textTransform: 'none', 
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(245, 236, 213, 0.1)'
                  }
                }}
                startIcon={<ContactMail />}
              >
                Contact
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user.profile.firstName} src={user.profile.avatar} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {userMenuItems.map((item) => (
                      <MenuItem key={item.text} onClick={() => {
                        item.action();
                        handleCloseUserMenu();
                      }}>
                        <Typography textAlign="center">{item.text}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    component={RouterLink}
                    to="/signin"
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Sign In
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="contained"
                    sx={{ bgcolor: 'secondary.main' }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 