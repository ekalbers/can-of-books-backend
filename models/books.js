const express = require('express');
const Book = require('./BookModel');

const router = express.Router();

router.get('/books', async (request, response) => {

    try {
        const book = await Book.find();
        response.status(200).json(book);
    } catch (error) {
        response.status(400).json("there was an error");
    }

});

router.post('/', async (request, response) => {
    const { title, author, description, status } = request.body;
    console.log(request.body);
    console.log(title);

    /* const newBook = await Book.create({ "title": "The Impossible First", "author": "Colin Obrady", "description": "Colin O'Brady's awe-inspiring, New York Times bestselling memoir recounting his recovery from a tragic accident and his record-setting 932-mile solo crossing of Antarctica is a \"jaw-dropping tale of passion and perseverance\"", "status": true }); */

    try {
        const book = await Book.create({ title: title, author: author, description: description, status: status });
        response.status(200).json(book);
    } catch (error) {
        response.status(400).json("there was an error post");
    }
})

module.exports = router;