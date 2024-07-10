const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8042;
const { errorHandler } = require('./middleware/errorMiddleware')

// Creates App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use functions from other js file, goalRoutes.js
app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server live from port ${port}`));