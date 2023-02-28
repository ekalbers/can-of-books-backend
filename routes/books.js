const express = require('express');
const Book = require('../models/BookModel');

const router = express.Router();

router.get('/', async (request, response) => {

    try {
        const book = await Book.find();
        response.status(200).json(book);
    } catch (error) {
        response.status(400).json("there was an error");
    }

});

router.post('/add', async (request, response) => {
    const { title, author, description, status } = request.body;
    console.log(request.body);
    console.log(title);

    try {
        const book = await Book.create({ title: title, author: author, description: description, status: status });
        response.status(200).json(book);
    } catch (error) {
        response.status(400).json("there was an error post");
    }
})

router.delete('/:id', async (request, response) {

})

module.exports = router;