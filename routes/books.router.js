const express = require('express');
const repo = require('../repositories/book.repo');
const router = express.Router();

router.get('/', function(req, res){
    let books = repo.books;

    res.render('books', {books: books, title: 'Book Store'});
});

module.exports = router;