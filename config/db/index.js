const mongoose = require('mongoose');
const dotenv = require('dotenv');

async function connect() {
    try {
        dotenv.config();
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connect to Mongodb successfully!!!');
    } catch (error) {
        console.log('Connect to Mongodb failure!!!');
    }
}

module.exports = { connect };
