import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './db/connectDB.js';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: '50mb' })); // Middleware to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data in the req.body
app.use(cookieParser()); // Middleware to parse cookies in the req.headers

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
