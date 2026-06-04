import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connect } from 'mongoose';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
await connectDB();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => { res.send('Server is running!'); });

app.use('/api/users', userRouter);

app.use('/api/resumes', resumeRouter);

app.use('/api/ai', aiRouter);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });