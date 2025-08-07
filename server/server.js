const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Environment variables with defaults
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5003;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(morgan('dev')); // Logging
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));

if (NODE_ENV === 'production') {
  app.use(helmet()); // Security headers
}

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Serve static files in production
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server with enhanced error handling
const server = app.listen(PORT, () => {
  console.log(`
========================================
🚀 Server running on port ${PORT}
🌐 Environment: ${NODE_ENV}
🔗 MongoDB: Connected
========================================
  `);
})
.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`
❌ Failed to start server:
========================================
Port ${PORT} is already in use by another process.

Solutions:
1. Kill the existing process:
   netstat -ano | findstr :${PORT}
   taskkill /PID <PID> /F

2. Change PORT in .env or server.js (currently ${PORT})

3. Restart your computer to clear all ports
========================================
    `);
  } else {
    console.error('❌ Failed to start server:', err);
  }
  process.exit(1);
});

// Handle process termination gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server terminated');
    process.exit(0);
  });
});