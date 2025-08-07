import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Rating
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const [profileRes, statsRes] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          config
        ),
        axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/${user.role}-stats`,
          config
        )
      ]);

      setProfile(profileRes.data);
      setStats(statsRes.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Profile not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={profile.profilePicture}
              alt={`${profile.firstName} ${profile.lastName}`}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2
              }}
            >
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
            
            <Typography variant="h5" gutterBottom>
              {profile.firstName} {profile.lastName}
            </Typography>
            
            <Typography color="textSecondary" gutterBottom>
              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </Typography>

            <Box sx={{ mt: 2, mb: 3 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/edit-profile')}
                fullWidth
              >
                Edit Profile
              </Button>
            </Box>

            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <EmailIcon sx={{ mr: 1 }} />
                      {profile.email}
                    </Box>
                  }
                />
              </ListItem>
              {profile.location && (
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <LocationIcon sx={{ mr: 1 }} />
                        {profile.location}
                      </Box>
                    }
                  />
                </ListItem>
              )}
            </List>

            {profile.social && (
              <Box sx={{ mt: 2 }}>
                {profile.social.linkedin && (
                  <IconButton
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                  </IconButton>
                )}
                {profile.social.twitter && (
                  <IconButton
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon />
                  </IconButton>
                )}
                {profile.social.github && (
                  <IconButton
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon />
                  </IconButton>
                )}
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography paragraph>
              {profile.bio || 'No bio provided'}
            </Typography>

            {profile.skills && profile.skills.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {profile.skills.map((skill) => (
                    <Chip key={skill} label={skill} />
                  ))}
                </Box>
              </>
            )}

            {profile.role === 'freelancer' && (
              <>
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Professional Info
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Hourly Rate
                      </Typography>
                      <Typography variant="h6">
                        ${profile.hourlyRate || 0}/hr
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Projects Completed
                      </Typography>
                      <Typography variant="h6">
                        {stats?.completedProjects || 0}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {profile.experience && (
                  <>
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                      Experience
                    </Typography>
                    <List>
                      {profile.experience.map((exp, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center">
                                <WorkIcon sx={{ mr: 1 }} />
                                {exp.title} at {exp.company}
                              </Box>
                            }
                            secondary={`${exp.startDate} - ${
                              exp.endDate || 'Present'
                            }`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {profile.education && (
                  <>
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                      Education
                    </Typography>
                    <List>
                      {profile.education.map((edu, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center">
                                <SchoolIcon sx={{ mr: 1 }} />
                                {edu.degree} in {edu.field}
                              </Box>
                            }
                            secondary={`${edu.school} (${edu.graduationYear})`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </>
            )}

            {profile.role === 'entrepreneur' && (
              <>
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Business Info
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Company
                      </Typography>
                      <Typography variant="h6">
                        {profile.company || 'Not specified'}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Projects Posted
                      </Typography>
                      <Typography variant="h6">
                        {stats?.postedProjects || 0}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </>
            )}

            {profile.role === 'investor' && (
              <>
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Investment Info
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Investments Made
                      </Typography>
                      <Typography variant="h6">
                        {stats?.investmentsMade || 0}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Portfolio Value
                      </Typography>
                      <Typography variant="h6">
                        ${stats?.portfolioValue || 0}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {profile.investmentPreferences && (
                  <>
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                      Investment Preferences
                    </Typography>
                    <List>
                      {profile.investmentPreferences.map((pref, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={pref} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 