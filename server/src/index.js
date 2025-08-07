import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 5002;
const CLIENT_URL = 'http://localhost:3000';

// Connect to database first, then start server
connectDB()
  .then(() => {
    // Middleware
    app.use(morgan('dev'));
    app.use(cors({
      origin: CLIENT_URL,
      credentials: true
    }));
    app.use(express.json());

    // Routes
    app.use('/api/auth', authRoutes);

    // Error handling
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Something went wrong!' });
    });

    // Start server only after DB connection is established
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });