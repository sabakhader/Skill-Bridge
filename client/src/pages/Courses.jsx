import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Rating,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Star as StarIcon
} from '@mui/icons-material';
import CoursePayment from '../components/CoursePayment';

const Courses = () => {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // TODO: Integrate with Mendix course endpoints
  const courses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      description: 'Learn to build modern web applications from front to back end',
      instructor: 'John Smith',
      rating: 4.8,
      reviews: 245,
      price: 199.99,
      duration: '12 weeks',
      level: 'Intermediate',
      category: 'Web Development',
      image: 'https://source.unsplash.com/random/400x300/?coding'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master the basics of data analysis and machine learning',
      instructor: 'Sarah Johnson',
      rating: 4.6,
      reviews: 189,
      price: 149.99,
      duration: '8 weeks',
      level: 'Beginner',
      category: 'Data Science',
      image: 'https://source.unsplash.com/random/400x300/?data'
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      description: 'Create beautiful and user-friendly digital experiences',
      instructor: 'Michael Chen',
      rating: 4.9,
      reviews: 312,
      price: 179.99,
      duration: '10 weeks',
      level: 'Advanced',
      category: 'Design',
      image: 'https://source.unsplash.com/random/400x300/?design'
    }
  ];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter) => {
    if (filter && filter !== selectedFilter) {
      setSelectedFilter(filter);
      // TODO: Integrate with Mendix to filter courses
    }
    setFilterAnchorEl(null);
  };

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setPaymentOpen(true);
  };

  const handlePaymentComplete = (paymentDetails) => {
    // Here you would typically make an API call to your backend
    // to process the enrollment and payment
    console.log('Payment completed:', paymentDetails);
    
    setSnackbar({
      open: true,
      message: 'Successfully enrolled in the course!',
      severity: 'success'
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
          Online Courses
        </Typography>

        {/* Search and Filter */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search courses..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={handleFilterClick}
              >
                Filter by: {selectedFilter}
              </Button>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={() => handleFilterClose()}
              >
                <MenuItem onClick={() => handleFilterClose('All')}>All</MenuItem>
                <MenuItem onClick={() => handleFilterClose('Web Development')}>Web Development</MenuItem>
                <MenuItem onClick={() => handleFilterClose('Data Science')}>Data Science</MenuItem>
                <MenuItem onClick={() => handleFilterClose('Design')}>Design</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Box>

        {/* Course List */}
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item xs={12} md={4} key={course.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Instructor: {course.instructor}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
                      <Rating
                        value={course.rating}
                        readOnly
                        precision={0.1}
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({course.reviews} reviews)
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={course.level} size="small" />
                    <Chip label={course.duration} size="small" />
                    <Chip label={course.category} size="small" color="primary" />
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Typography variant="h6" color="primary">
                    ${course.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleEnrollClick(course)}
                  >
                    Enroll Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Start Learning Today
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Join thousands of students who are already advancing their careers with SkillBridge courses.
          </Typography>
          <Button variant="contained" size="large">
            Browse All Courses
          </Button>
        </Box>

        {/* Payment Dialog */}
        <CoursePayment
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          course={selectedCourse}
          onPaymentComplete={handlePaymentComplete}
        />

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
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

export default Courses; 