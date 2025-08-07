import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Rating,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const mockFreelancers = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Full Stack Developer',
    rating: 4.8,
    hourlyRate: 45,
    skills: ['React', 'Node.js', 'MongoDB'],
    description: '5 years of experience in web development. Specialized in MERN stack.',
    avatar: 'https://mui.com/static/images/avatar/1.jpg'
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'UI/UX Designer',
    rating: 4.9,
    hourlyRate: 55,
    skills: ['Figma', 'Adobe XD', 'Sketch'],
    description: '7 years of experience in UI/UX design. Expert in creating user-centered designs.',
    avatar: 'https://mui.com/static/images/avatar/2.jpg'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    title: 'Mobile Developer',
    rating: 4.7,
    hourlyRate: 50,
    skills: ['React Native', 'Flutter', 'iOS'],
    description: '4 years of experience in mobile app development. Specialized in cross-platform development.',
    avatar: 'https://mui.com/static/images/avatar/3.jpg'
  }
];

const HireFreelancer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [hireDialogOpen, setHireDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    budget: '',
    duration: ''
  });

  const handleSearch = (event) => {
    event.preventDefault();
    // Implement search functionality
  };

  const handleHire = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setHireDialogOpen(true);
  };

  const handleProjectDetailsChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHireSubmit = () => {
    // Here you would typically make an API call to your backend
    // to process the hiring request
    
    setHireDialogOpen(false);
    setSnackbar({
      open: true,
      message: `Successfully sent hiring request to ${selectedFreelancer.name}!`,
      severity: 'success'
    });
    
    // Reset project details
    setProjectDetails({
      title: '',
      description: '',
      budget: '',
      duration: ''
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Hire Skilled Freelancers
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSearch}>
              <TextField
                fullWidth
                placeholder="Search by skill, title, or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                      <SearchIcon />
                    </Button>
                  ),
                }}
              />
            </form>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="web">Web Development</MenuItem>
                <MenuItem value="mobile">Mobile Development</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="writing">Writing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Price Range</InputLabel>
              <Select
                value={priceRange}
                label="Price Range"
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <MenuItem value="0-25">$0-25/hr</MenuItem>
                <MenuItem value="25-50">$25-50/hr</MenuItem>
                <MenuItem value="50-100">$50-100/hr</MenuItem>
                <MenuItem value="100+">$100+/hr</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Freelancer Cards */}
      <Grid container spacing={3}>
        {mockFreelancers.map((freelancer) => (
          <Grid item xs={12} md={6} lg={4} key={freelancer.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={freelancer.avatar}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{freelancer.name}</Typography>
                    <Typography color="textSecondary">{freelancer.title}</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={freelancer.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({freelancer.rating})
                  </Typography>
                </Box>

                <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
                  ${freelancer.hourlyRate}/hr
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {freelancer.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {freelancer.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleHire(freelancer)}
                >
                  Hire Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Hire Confirmation Dialog */}
      <Dialog
        open={hireDialogOpen}
        onClose={() => setHireDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Hire {selectedFreelancer?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Freelancer Details
            </Typography>
            <Typography variant="body1">
              {selectedFreelancer?.title}
            </Typography>
            <Typography variant="body2" color="primary">
              ${selectedFreelancer?.hourlyRate}/hr
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            Project Details
          </Typography>

          <TextField
            fullWidth
            label="Project Title"
            name="title"
            value={projectDetails.title}
            onChange={handleProjectDetailsChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Project Description"
            name="description"
            value={projectDetails.description}
            onChange={handleProjectDetailsChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budget"
                name="budget"
                value={projectDetails.budget}
                onChange={handleProjectDetailsChange}
                margin="normal"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (in weeks)"
                name="duration"
                value={projectDetails.duration}
                onChange={handleProjectDetailsChange}
                margin="normal"
                type="number"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHireDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleHireSubmit}
            disabled={!projectDetails.title || !projectDetails.description || !projectDetails.budget || !projectDetails.duration}
          >
            Send Hiring Request
          </Button>
        </DialogActions>
      </Dialog>

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
    </Container>
  );
};

export default HireFreelancer; 