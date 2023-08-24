const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const authorRoute = require('./routes/author');
const db = require('./config/db');

// Connect to db
db.connect();

const app = express();
const port = 8800;

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Routes init
app.use('/api/users', userRoute);
app.use('/api/author', authorRoute);

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Listening port
app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
