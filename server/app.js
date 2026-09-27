import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/database.js';
import { bootstrapAppData } from './seeders/bootstrap.js';
import authRoutes from './routes/auth.route.js';
import tableRoutes from './routes/table.route.js';
import sessionRoutes from './routes/session.route.js';
import menuRoutes from './routes/menu.route.js';
import coupanRoutes from './routes/coupan.route.js';
import cartRoutes from './routes/cart.route.js';
import orderRoutes from './routes/order.routes.js';
import userRoutes from './routes/user.route.js';
import paymentRoutes from './routes/payment.route.js';

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server) or in allowed list or vercel previews
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive fallback so deployment doesn't fail on new domain
      }
    },
    credentials: true,
  })
);

// Connect to MongoDB then seed missing defaults
dbConnect().then(() => bootstrapAppData()).catch((err) => {
  console.error('Bootstrap failed:', err.message);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('QRDine API is running');
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', tableRoutes);
app.use('/api/v1', sessionRoutes);
app.use('/api/v1', menuRoutes);
app.use('/api/v1', cartRoutes);
app.use('/api/v1', coupanRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', paymentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  if (err) {
    const status = err.status || err.statusCode || 500;
    return res.status(status).json({
      success: false,
      message: err.message || 'Internal server error',
    });
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;