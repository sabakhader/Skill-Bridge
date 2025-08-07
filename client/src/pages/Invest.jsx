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
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Invest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // TODO: Integrate with Mendix investment endpoints
  const investmentOpportunities = [
    {
      title: 'Tech Startup Fund',
      description: 'Investment opportunity in emerging tech startups',
      raised: 750000,
      goal: 1000000,
      minInvestment: 5000,
      returns: '15-20%',
      risk: 'Moderate'
    },
    {
      title: 'AI Innovation Portfolio',
      description: 'Diversified portfolio of AI-focused companies',
      raised: 450000,
      goal: 800000,
      minInvestment: 10000,
      returns: '20-25%',
      risk: 'High'
    },
    {
      title: 'EdTech Growth Fund',
      description: 'Investment in educational technology sector',
      raised: 300000,
      goal: 500000,
      minInvestment: 2500,
      returns: '12-15%',
      risk: 'Low'
    }
  ];

  const calculateProgress = (raised, goal) => (raised / goal) * 100;

  const handleLearnMore = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setDetailsOpen(true);
  };

  const handleInvestNow = (opportunity) => {
    if (!user) {
      navigate('/signin', { state: { from: '/invest' } });
      return;
    }

    // Here you would typically handle the investment process
    setSnackbar({
      open: true,
      message: 'Investment successful! Thank you for investing.',
      severity: 'success'
    });
  };

  const handleCreateAccount = () => {
    navigate('/signup', { state: { role: 'investor' } });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
          Investment Opportunities
        </Typography>

        {/* Investment Benefits */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'background.paper' }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                High Growth Potential
              </Typography>
              <Typography variant="body1">
                Access carefully vetted opportunities in high-growth sectors with significant return potential.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'background.paper' }}>
              <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Secure Investment
              </Typography>
              <Typography variant="body1">
                Your investments are protected through our secure platform and regulatory compliance.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'background.paper' }}>
              <AccountBalanceIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Professional Management
              </Typography>
              <Typography variant="body1">
                Expert fund managers ensure optimal portfolio performance and risk management.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Investment Opportunities */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Current Opportunities
        </Typography>
        <Grid container spacing={4}>
          {investmentOpportunities.map((opportunity, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {opportunity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {opportunity.description}
                  </Typography>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Funding Progress
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={calculateProgress(opportunity.raised, opportunity.goal)} 
                      sx={{ my: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ${opportunity.raised.toLocaleString()} raised of ${opportunity.goal.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Chip 
                          label={`Min. Investment: $${opportunity.minInvestment.toLocaleString()}`}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          label={`Returns: ${opportunity.returns}`}
                          size="small"
                          color="primary"
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          label={`Risk: ${opportunity.risk}`}
                          size="small"
                          color={
                            opportunity.risk === 'High' ? 'error' :
                            opportunity.risk === 'Moderate' ? 'warning' : 'success'
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => handleLearnMore(opportunity)}
                  >
                    Learn More
                  </Button>
                  <Button 
                    size="small" 
                    variant="contained"
                    onClick={() => handleInvestNow(opportunity)}
                  >
                    Invest Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Paper elevation={0} sx={{ p: 6, mt: 8, textAlign: 'center', bgcolor: 'background.paper' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Start Investing?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Join thousands of investors who have already discovered the potential of our investment opportunities.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleCreateAccount}
          >
            Create Investment Account
          </Button>
        </Paper>

        {/* Investment Details Dialog */}
        <Dialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          {selectedOpportunity && (
            <>
              <DialogTitle>
                {selectedOpportunity.title}
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1" paragraph>
                  {selectedOpportunity.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <List>
                  <ListItem>
                    <ListItemText
                      primary="Investment Details"
                      secondary={`Minimum Investment: $${selectedOpportunity.minInvestment.toLocaleString()}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Expected Returns"
                      secondary={selectedOpportunity.returns}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Risk Level"
                      secondary={selectedOpportunity.risk}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Progress"
                      secondary={`${calculateProgress(selectedOpportunity.raised, selectedOpportunity.goal).toFixed(1)}% Complete`}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Investment Strategy
                </Typography>
                <Typography variant="body2" paragraph>
                  This investment opportunity focuses on {selectedOpportunity.title.toLowerCase()} with a balanced approach to risk and returns. Our expert team carefully vets and manages each investment to maximize potential returns while maintaining appropriate risk levels.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDetailsOpen(false)}>
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleInvestNow(selectedOpportunity);
                    setDetailsOpen(false);
                  }}
                >
                  Invest Now
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
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

export default Invest; 