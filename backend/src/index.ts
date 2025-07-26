import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


import noteRoutes from './routes/noteRoutes';
app.use('/api/notes', noteRoutes);


// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
