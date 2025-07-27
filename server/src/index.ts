import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import studentRoutes from  './routes/student.route'; 
import teacherRoutes from  './routes/teacher.route'; 
import principalRoutes from './routes/principal.route';
import authRoutes from "./routes/auth.route";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());

// CORS configuration - IMPORTANT: Must be before other middleware

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Your Next.js app URL
  credentials: true, // ⭐ CRITICAL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
}));




// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// DB
connectDB();

// Routes
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/principal', principalRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
