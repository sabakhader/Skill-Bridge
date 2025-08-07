import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Fab
} from '@mui/material';
import {
  People as PeopleIcon,
  Forum as ForumIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import CreatePost from '../components/CreatePost';

const Community = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Mock data
  const communityStats = {
    members: '5,000+',
    discussions: '1,000+',
    events: '50+'
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'Web Development Workshop',
      date: 'June 15, 2024',
      time: '2:00 PM - 5:00 PM',
      type: 'Workshop',
      attendees: 45,
      location: 'Tech Hub, Silicon Valley',
      description: 'Join us for an intensive workshop on modern web development practices. Learn about the latest frameworks and tools used in the industry.',
      organizer: 'John Smith',
      prerequisites: ['Basic HTML/CSS knowledge', 'JavaScript fundamentals'],
      topics: ['React.js', 'Node.js', 'RESTful APIs', 'Database Design']
    },
    {
      id: 2,
      title: 'Tech Career Fair',
      date: 'June 20, 2024',
      time: '10:00 AM - 4:00 PM',
      type: 'Career Fair',
      attendees: 120,
      location: 'Convention Center, Downtown',
      description: 'Connect with top tech companies and explore career opportunities. Bring your resume and be ready for on-site interviews.',
      organizer: 'Tech Recruiters Association',
      companies: ['Google', 'Microsoft', 'Amazon', 'Facebook'],
      requirements: ['Updated Resume', 'Portfolio (if applicable)']
    },
    {
      id: 3,
      title: 'AI in Business Seminar',
      date: 'June 25, 2024',
      time: '1:00 PM - 3:00 PM',
      type: 'Seminar',
      attendees: 75,
      location: 'Business Center, Financial District',
      description: 'Learn how AI is transforming business operations and decision-making processes.',
      organizer: 'AI Business Forum',
      speakers: ['Dr. Sarah Chen', 'Mark Thompson'],
      topics: ['Machine Learning', 'Business Analytics', 'AI Implementation']
    }
  ];

  const featuredMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Full Stack Developer',
      contributions: 156,
      followers: 234,
      projects: 12,
      skills: ['React', 'Node.js', 'Python'],
      bio: 'Passionate about creating scalable web applications and mentoring junior developers.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'UI/UX Designer',
      contributions: 142,
      followers: 189,
      projects: 15,
      skills: ['Figma', 'Adobe XD', 'User Research'],
      bio: 'Creating user-centered designs with a focus on accessibility and usability.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      contributions: 128,
      followers: 167,
      projects: 8,
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
      bio: 'Working on innovative ML solutions for real-world problems.'
    }
  ];

  const handleEventLearnMore = (event) => {
    setSelectedEvent(event);
    setEventDialogOpen(true);
  };

  const handleJoinEvent = (event) => {
    if (!user) {
      navigate('/signin', { state: { from: '/community' } });
      return;
    }

    // Here you would typically make an API call to join the event
    setSnackbar({
      open: true,
      message: `Successfully joined ${event.title}!`,
      severity: 'success'
    });
  };

  const handleFollowMember = (member) => {
    if (!user) {
      navigate('/signin', { state: { from: '/community' } });
      return;
    }

    // Here you would typically make an API call to follow the member
    setSnackbar({
      open: true,
      message: `You are now following ${member.name}`,
      severity: 'success'
    });
  };

  const handleViewProfile = (member) => {
    // Navigate to member's profile page
    navigate(`/profile/${member.id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCreatePost = () => {
    if (!user) {
      navigate('/signin', { state: { from: '/community' } });
      return;
    }
    setCreatePostOpen(true);
  };

  const handlePostSubmit = (postData) => {
    // Here you would typically make an API call to submit the post
    setSnackbar({
      open: true,
      message: 'Post created successfully!',
      severity: 'success'
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Our Community
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreatePost}
          >
            Create Post
          </Button>
        </Box>

        {/* Community Stats */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                {communityStats.members}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Active Members
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
              <ForumIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                {communityStats.discussions}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Discussions
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
              <EventIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                {communityStats.events}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Events Hosted
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Upcoming Events */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Upcoming Events
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {upcomingEvents.map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TimeIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {event.location}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Chip label={event.type} color="primary" size="small" sx={{ mr: 1 }} />
                    <Chip
                      icon={<GroupIcon sx={{ fontSize: '16px !important' }} />}
                      label={`${event.attendees} attendees`}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEventLearnMore(event)}
                  >
                    Learn More
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleJoinEvent(event)}
                  >
                    Join Event
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Members */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Featured Members
        </Typography>
        <Grid container spacing={4}>
          {featuredMembers.map((member) => (
            <Grid item xs={12} md={4} key={member.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main' }}>
                      {member.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {member.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {member.bio}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {member.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" align="center">
                        {member.contributions}
                      </Typography>
                      <Typography variant="caption" align="center" display="block" color="text.secondary">
                        Contributions
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" align="center">
                        {member.followers}
                      </Typography>
                      <Typography variant="caption" align="center" display="block" color="text.secondary">
                        Followers
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" align="center">
                        {member.projects}
                      </Typography>
                      <Typography variant="caption" align="center" display="block" color="text.secondary">
                        Projects
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleViewProfile(member)}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleFollowMember(member)}
                  >
                    Follow
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Event Details Dialog */}
        <Dialog
          open={eventDialogOpen}
          onClose={() => setEventDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          {selectedEvent && (
            <>
              <DialogTitle>
                {selectedEvent.title}
              </DialogTitle>
              <DialogContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Date & Time"
                      secondary={`${selectedEvent.date}, ${selectedEvent.time}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={selectedEvent.location}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <GroupIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Attendees"
                      secondary={`${selectedEvent.attendees} registered`}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                  About the Event
                </Typography>
                <Typography variant="body2" paragraph>
                  {selectedEvent.description}
                </Typography>

                {selectedEvent.prerequisites && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Prerequisites
                    </Typography>
                    <List dense>
                      {selectedEvent.prerequisites.map((prereq, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={prereq} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {selectedEvent.topics && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Topics Covered
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {selectedEvent.topics.map((topic, index) => (
                        <Chip
                          key={index}
                          label={topic}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </>
                )}

                {selectedEvent.companies && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Participating Companies
                    </Typography>
                    <List dense>
                      {selectedEvent.companies.map((company, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={company} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {selectedEvent.speakers && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Speakers
                    </Typography>
                    <List dense>
                      {selectedEvent.speakers.map((speaker, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={speaker} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEventDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleJoinEvent(selectedEvent);
                    setEventDialogOpen(false);
                  }}
                >
                  Join Event
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Create Post Dialog */}
        <CreatePost
          open={createPostOpen}
          onClose={() => setCreatePostOpen(false)}
          onSubmit={handlePostSubmit}
        />

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Community; 