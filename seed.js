const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/BookModel');

async function seed() {
    let impossibleFirst = await Book.create({
        title: 'The Impossible First',
        author: 'Colin Obrady',
        description: 'Colin O\'Brady\'s awe-inspiring, New York Times bestselling memoir recounting his recovery from a tragic accident and his record-setting 932-mile solo crossing of Antarctica is a \"jaw-dropping tale of passion and perseverance\"',
        status: true
    });

    console.log(impossibleFirst);

    let federalist = await Book.create({
        title: 'The Federalist Papers',
        author: 'Alexander Hamilton, James Madison, John Jay',
        description: 'The Federalist Papers is a collection of 85 articles and essays written by Alexander Hamilton, James Madison, and John Jay under the collective pseudonym "Publius" to promote the ratification of the Constitution of the United States.',
        status: false
    });

    console.log(federalist);

    let endurance = await Book.create({
        title: 'Endurance: Shackleton\'s Incredible Voyage',
        author: 'Alfred Lansing',
        description: 'Endurance: Shackleton\'s Incredible Voyage, is a 1959 book written by Alfred Lansing, about the failure of the Imperial Trans-Antarctic Expedition led by Sir Ernest Shackleton, in its attempt to cross the Antarctic continent in 1914.',
        status: false
    });

    console.log(endurance);

    mongoose.disconnect();
}

seed();