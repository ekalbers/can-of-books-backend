const express = require('express');
const Book = require('../models/BookModel');

const router = express.Router();

router.get('/books', async (request, response) => {
    const email = request.user.email
    try {
        const books = await Book.find({ email: email });
        if (books.length > 0) {
            response.status(200).json(books);
        } else {
            response.status(404).json('error');
        }
    } catch (error) {
        response.status(500).json("server side error");
    }

});

router.post('/books', async (request, response) => {
    const { email } = request.user.email;
    const { title, author, description, status } = request.body;
    console.log(request.body);
    console.log(title);

    try {
        const book = await Book.create({ title: title, author: author, description: description, status: status, email: email });
        response.status(200).json(book);
    } catch (error) {
        response.status(500).json("there was an error post");
    }
})

router.put('/books/:id', async (request, response) => {
    const id = request.params.id;
    const { email } = request.user.email;

    try {
        const book = await Book.findOne({ _id: id, email });
        if (!book) {
            response.status(400).send('unable to update book');
        } else {
            let updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true });
            response.status(202).json(updatedBook);
        }
    } catch (error) {
        response.status(404).send('unable to update');
        console.error(error);
    }
});

router.delete('/books/:id', async (request, response) => {
    const { id } = request.params.id;
    const { email } = request.user.email;

    try {
        const book = await Book.findOne({ _id: id, email });
        if (!book) {
            response.status(400).send('unable to delete book');
        } else {
            await Book.findByIdAndDelete(id);
            response.status(204).send(`successfully deleted ${id}`);
        }
    } catch (error) {
        response.status(404).send(`unable to delete book with id ${id}`);
    }
})

router.get('/user', async (response, request) => {
    console.log('getting user');
    response.status(200).send(request.user);
})

module.exports = router;