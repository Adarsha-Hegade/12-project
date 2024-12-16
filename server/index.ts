import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config/env';
import { connectToDatabase } from './config/database';
import { authRouter } from './routes/auth';
import { productsRouter } from './routes/products';
import { errorHandler } from './middleware/error';
import { auth } from './config/auth';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

// Error handling
app.use(errorHandler);

// Initialize server
async function startServer() {
  try {
    // Initialize auth system first
    await auth.init();
    console.log('✅ Auth system initialized');

    // Connect to database
    await connectToDatabase();
    console.log('✅ Database connected');

    // Start server
    const port = config.server.port;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start server
startServer();

export default app;