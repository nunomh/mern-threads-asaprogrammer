import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './db/connectDB.js';

import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data in the req.body
app.use(cookieParser()); // Middleware to parse cookies in the req.headers

// Routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
