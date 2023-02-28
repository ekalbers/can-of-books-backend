const express = require('express');
const Book = require('../models/BookModel');

const router = express.Router();

router.get('/books', async (request, response) => {

    try {
        const book = await Book.find();
        response.status(200).json(book);
    } catch (error) {
        response.status(500).json("server side error");
    }

});

router.post('/books', async (request, response) => {
    const { title, author, description, status } = request.body;
    console.log(request.body);
    console.log(title);

    try {
        const book = await Book.create({ title: title, author: author, description: description, status: status });
        response.status(200).json(book);
    } catch (error) {
        response.status(500).json("there was an error post");
    }
})

router.delete('/books/:id', async (request, response) => {
    const { id } = request.params;

    try {
        await Book.findByIdAndDelete(id);
        response.status(204).send(`successfully deleted ${id}`);
    } catch (error) {
        response.status(404).send(`unable to delete book with id ${id}`);
    }
})


module.exports = router;