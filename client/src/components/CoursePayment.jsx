import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert
} from '@mui/material';
import { CreditCard as CreditCardIcon, AccountBalance as BankIcon } from '@mui/icons-material';

const CoursePayment = ({ open, onClose, course, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Here you would integrate with your payment processor (e.g., Stripe)
      // For now, we'll simulate a payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onPaymentComplete({
        courseId: course.id,
        amount: course.price,
        paymentMethod,
        timestamp: new Date().toISOString()
      });
      
      handleClose();
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
      email: ''
    });
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Course Payment</Typography>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {course?.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${course?.price}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Payment Method</FormLabel>
            <RadioGroup
              row
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardIcon sx={{ mr: 1 }} />
                    Credit Card
                  </Box>
                }
              />
              <FormControlLabel
                value="bank"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BankIcon sx={{ mr: 1 }} />
                    Bank Transfer
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>

          {paymentMethod === 'card' ? (
            <>
              <TextField
                margin="dense"
                name="cardNumber"
                label="Card Number"
                type="text"
                fullWidth
                required
                value={formData.cardNumber}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  margin="dense"
                  name="expiryDate"
                  label="MM/YY"
                  type="text"
                  required
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="cvv"
                  label="CVV"
                  type="password"
                  required
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </Box>
            </>
          ) : (
            <Alert severity="info" sx={{ mb: 2 }}>
              Bank transfer details will be sent to your email after confirmation.
            </Alert>
          )}

          <TextField
            margin="dense"
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CoursePayment; 