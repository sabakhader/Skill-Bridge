import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    location: '',
    skills: [],
    profilePicture: '',
    social: {
      linkedin: '',
      twitter: '',
      github: ''
    },
    // Freelancer specific fields
    hourlyRate: '',
    experience: [{
      title: '',
      company: '',
      startDate: '',
      endDate: ''
    }],
    education: [{
      school: '',
      degree: '',
      field: '',
      graduationYear: ''
    }],
    // Entrepreneur specific fields
    company: '',
    // Investor specific fields
    investmentPreferences: []
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        config
      );

      setFormData({
        ...formData,
        ...response.data,
        social: response.data.social || formData.social
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value
      }
    }));
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToDelete)
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: '', company: '', startDate: '', endDate: '' }
      ]
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { school: '', degree: '', field: '', graduationYear: '' }
      ]
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handlePreferenceAdd = (preference) => {
    if (preference.trim() && !formData.investmentPreferences.includes(preference.trim())) {
      setFormData(prev => ({
        ...prev,
        investmentPreferences: [...prev.investmentPreferences, preference.trim()]
      }));
    }
  };

  const handlePreferenceDelete = (prefToDelete) => {
    setFormData(prev => ({
      ...prev,
      investmentPreferences: prev.investmentPreferences.filter(pref => pref !== prefToDelete)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        formData,
        config
      );

      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
              <Avatar
                src={formData.profilePicture}
                alt={`${formData.firstName} ${formData.lastName}`}
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-picture-input"
                type="file"
                onChange={(e) => {
                  // Handle file upload
                  // In a real app, you would upload to cloud storage
                  const file = e.target.files[0];
                  if (file) {
                    setFormData(prev => ({
                      ...prev,
                      profilePicture: URL.createObjectURL(file)
                    }));
                  }
                }}
              />
              <label htmlFor="profile-picture-input">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCameraIcon />
                </IconButton>
              </label>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={formData.bio}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  label="Add Skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSkillAdd();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSkillAdd}
                  disabled={!skillInput.trim()}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => handleSkillDelete(skill)}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Social Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="LinkedIn Profile"
                    name="linkedin"
                    value={formData.social.linkedin}
                    onChange={handleSocialChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Twitter Profile"
                    name="twitter"
                    value={formData.social.twitter}
                    onChange={handleSocialChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="GitHub Profile"
                    name="github"
                    value={formData.social.github}
                    onChange={handleSocialChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            {user.role === 'freelancer' && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Professional Info
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Hourly Rate ($)"
                    name="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Experience
                    </Typography>
                    {formData.experience.map((exp, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Job Title"
                              value={exp.title}
                              onChange={(e) =>
                                handleExperienceChange(index, 'title', e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Company"
                              value={exp.company}
                              onChange={(e) =>
                                handleExperienceChange(index, 'company', e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <TextField
                              fullWidth
                              label="Start Date"
                              value={exp.startDate}
                              onChange={(e) =>
                                handleExperienceChange(index, 'startDate', e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <TextField
                              fullWidth
                              label="End Date"
                              value={exp.endDate}
                              onChange={(e) =>
                                handleExperienceChange(index, 'endDate', e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Button
                              color="error"
                              onClick={() => handleRemoveExperience(index)}
                              disabled={formData.experience.length === 1}
                            >
                              <DeleteIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={handleAddExperience}
                    >
                      Add Experience
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Education
                    </Typography>
                    {formData.education.map((edu, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="School"
                              value={edu.school}
                              onChange={(e) =>
                                handleEducationChange(index, 'school', e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Degree"
                              value={edu.degree}
                              onChange={(e) =>
                                handleEducationChange(index, 'degree', e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <TextField
                              fullWidth
                              label="Field of Study"
                              value={edu.field}
                              onChange={(e) =>
                                handleEducationChange(index, 'field', e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <TextField
                              fullWidth
                              label="Graduation Year"
                              value={edu.graduationYear}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  'graduationYear',
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Button
                              color="error"
                              onClick={() => handleRemoveEducation(index)}
                              disabled={formData.education.length === 1}
                            >
                              <DeleteIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={handleAddEducation}
                    >
                      Add Education
                    </Button>
                  </Box>
                </Grid>
              </>
            )}

            {user.role === 'entrepreneur' && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Business Info
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}

            {user.role === 'investor' && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Investment Preferences
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      fullWidth
                      label="Add Investment Preference"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handlePreferenceAdd(skillInput);
                          setSkillInput('');
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        handlePreferenceAdd(skillInput);
                        setSkillInput('');
                      }}
                      disabled={!skillInput.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.investmentPreferences.map((pref) => (
                      <Chip
                        key={pref}
                        label={pref}
                        onDelete={() => handlePreferenceDelete(pref)}
                      />
                    ))}
                  </Box>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile; 