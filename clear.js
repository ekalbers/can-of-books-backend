const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/BookModel');

async function clear() {
    try {
        await Book.deleteMany({});
        console.log('Books cleared');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

clear();
