const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { checkAuth } = require('./middleware/middleware');
const companyRoutes = require('./routes/Company');
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/User');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Check if this matches your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Ensure credentials are handled properly
}));

// Database Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // Routes
        app.use('/api/company', companyRoutes);
        app.use('/api/auth', authRoutes);
        app.use('/api/user', checkAuth, userRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    })
    .catch(err => console.error('Database connection error:', err));
