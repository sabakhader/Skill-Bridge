import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputAdornment
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposalDialog, setProposalDialog] = useState(false);
  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    proposedBudget: '',
    estimatedTime: ''
  });
  const [submittingProposal, setSubmittingProposal] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`
      );
      setProject(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching project details');
    } finally {
      setLoading(false);
    }
  };

  const handleProposalSubmit = async () => {
    setSubmittingProposal(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}/proposals`,
        proposalData,
        config
      );

      setProposalDialog(false);
      fetchProject();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting proposal');
    } finally {
      setSubmittingProposal(false);
    }
  };

  const handleProposalAction = async (proposalId, status) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}/proposals/${proposalId}`,
        { status },
        config
      );

      fetchProject();
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating proposal');
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

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Project not found</Alert>
      </Container>
    );
  }

  const isOwner = user && project.owner._id === user._id;
  const isFreelancer = user && user.role === 'freelancer';
  const hasProposed = project.proposals.some(
    p => p.freelancer._id === user?._id
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {project.title}
            </Typography>
            
            <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<AccessTimeIcon />}
                label={`Deadline: ${format(new Date(project.deadline), 'MMM dd, yyyy')}`}
              />
              <Chip
                icon={<AttachMoneyIcon />}
                label={`Budget: $${project.budget}`}
                color="primary"
              />
              <Chip
                label={project.status}
                color={
                  project.status === 'open'
                    ? 'success'
                    : project.status === 'in-progress'
                    ? 'warning'
                    : 'default'
                }
              />
            </Box>

            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography paragraph>
              {project.description}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Required Skills
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {project.skills.map((skill) => (
                <Chip key={skill} label={skill} variant="outlined" />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Requirements
            </Typography>
            <List>
              {project.requirements.map((requirement, index) => (
                <ListItem key={index}>
                  <ListItemText primary={requirement} />
                </ListItem>
              ))}
            </List>

            {project.attachments.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Attachments
                </Typography>
                <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.attachments.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      component="a"
                      href={file.url}
                      target="_blank"
                      clickable
                    />
                  ))}
                </Box>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Owner
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={project.owner.profilePicture}
                  alt={`${project.owner.firstName} ${project.owner.lastName}`}
                  sx={{ mr: 2 }}
                >
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography>
                    {project.owner.firstName} {project.owner.lastName}
                  </Typography>
                  {project.owner.company && (
                    <Typography variant="body2" color="textSecondary">
                      {project.owner.company}
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>

          {isFreelancer && project.status === 'open' && !hasProposed && (
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => setProposalDialog(true)}
            >
              Submit Proposal
            </Button>
          )}

          {isOwner && project.proposals.length > 0 && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Proposals ({project.proposals.length})
              </Typography>
              <List>
                {project.proposals.map((proposal) => (
                  <ListItem
                    key={proposal._id}
                    alignItems="flex-start"
                    sx={{
                      mb: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 1
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={proposal.freelancer.profilePicture}
                        alt={`${proposal.freelancer.firstName} ${proposal.freelancer.lastName}`}
                      >
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${proposal.freelancer.firstName} ${proposal.freelancer.lastName}`}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Proposed Budget: ${proposal.proposedBudget}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Estimated Time: {proposal.estimatedTime}
                          </Typography>
                          <br />
                          {proposal.coverLetter}
                          <Box sx={{ mt: 1 }}>
                            {proposal.status === 'pending' ? (
                              <>
                                <Button
                                  size="small"
                                  color="primary"
                                  onClick={() =>
                                    handleProposalAction(proposal._id, 'accepted')
                                  }
                                  sx={{ mr: 1 }}
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  onClick={() =>
                                    handleProposalAction(proposal._id, 'rejected')
                                  }
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Chip
                                label={proposal.status}
                                color={
                                  proposal.status === 'accepted'
                                    ? 'success'
                                    : 'error'
                                }
                                size="small"
                              />
                            )}
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Dialog
        open={proposalDialog}
        onClose={() => setProposalDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Submit Proposal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Cover Letter"
            fullWidth
            multiline
            rows={4}
            value={proposalData.coverLetter}
            onChange={(e) =>
              setProposalData((prev) => ({
                ...prev,
                coverLetter: e.target.value
              }))
            }
            helperText="Explain why you're the best fit for this project"
          />
          <TextField
            margin="dense"
            label="Proposed Budget"
            fullWidth
            type="number"
            value={proposalData.proposedBudget}
            onChange={(e) =>
              setProposalData((prev) => ({
                ...prev,
                proposedBudget: e.target.value
              }))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
          <TextField
            margin="dense"
            label="Estimated Time"
            fullWidth
            value={proposalData.estimatedTime}
            onChange={(e) =>
              setProposalData((prev) => ({
                ...prev,
                estimatedTime: e.target.value
              }))
            }
            helperText="e.g., '2 weeks', '1 month'"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProposalDialog(false)}>Cancel</Button>
          <Button
            onClick={handleProposalSubmit}
            variant="contained"
            disabled={submittingProposal}
          >
            {submittingProposal ? 'Submitting...' : 'Submit Proposal'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectDetails; 