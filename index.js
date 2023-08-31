const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const authorRoute = require('./routes/author');
const postRoute = require('./routes/posts');
const db = require('./config/db');
const multer = require('multer');
const path = require('path');

// Connect to db
db.connect();

const app = express();
const port = 8800;

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully!');
    } catch (error) {
        console.log(error);
    }
});

// Routes init
app.use('/api/users', userRoute);
app.use('/api/author', authorRoute);
app.use('/api/posts', postRoute);

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Listening port
app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
