import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minBudget: '',
    maxBudget: '',
    status: ''
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.minBudget) queryParams.append('minBudget', filters.minBudget);
      if (filters.maxBudget) queryParams.append('maxBudget', filters.maxBudget);
      if (filters.status) queryParams.append('status', filters.status);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects?${queryParams.toString()}`
      );

      let filteredProjects = response.data;
      
      // Client-side search filtering
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProjects = filteredProjects.filter(
          project =>
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.skills.some(skill => skill.toLowerCase().includes(searchTerm))
        );
      }

      setProjects(filteredProjects);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Data Science',
    'Digital Marketing',
    'Content Writing'
  ];

  const statusOptions = ['open', 'in-progress', 'completed'];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Projects
        </Typography>
        {user?.role === 'entrepreneur' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/create-project')}
            sx={{ mb: 3 }}
          >
            Post New Project
          </Button>
        )}
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by title, description, or skills"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={filters.category}
                label="Category"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Min Budget"
              name="minBudget"
              type="number"
              value={filters.minBudget}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Max Budget"
              name="maxBudget"
              type="number"
              value={filters.maxBudget}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                label="Status"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {project.category}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {project.description.substring(0, 150)}...
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {project.skills.slice(0, 3).map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                      {project.skills.length > 3 && (
                        <Chip
                          label={`+${project.skills.length - 3}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                    <Typography variant="h6" color="primary">
                      ${project.budget}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleViewProject(project._id)}
                    >
                      View Details
                    </Button>
                    <Box flexGrow={1} />
                    <Chip
                      label={project.status}
                      color={
                        project.status === 'open'
                          ? 'success'
                          : project.status === 'in-progress'
                          ? 'warning'
                          : 'default'
                      }
                      size="small"
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary" align="center">
                No projects found matching your criteria
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Projects; 