const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const port = process.env.PORT || 8042;

connectDB();

// Creates App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use functions from other js file, goalRoutes.js
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server live from port ${port}`));