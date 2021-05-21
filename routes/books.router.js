const express = require('express');
const repo = require('../repositories/book.repo');
const router = express.Router();

router.get('/', function(req, res){
    let books = repo.books;

    res.render('books', {books: books, title: 'Book Store'});
});

router.get('/add', function( req, res, next ) {
    let model = {
        title: 'Add book',
        authorsSelect: {
            name: 'author',
            list: repo.authors.map( x => ({
                value: x.id,
                name: x.toString()    
            }))
        },
        languageSelect: {
            name: 'language',
            list: repo.languages.map( x => ({
                value: x.abbrev,
                name: x.langName
            })),
            selected: "en"
        }
    };
    res.render('addBook', model);
});

router.post('/add', function( req, res, next ) {
    console.log(req.body);
    try {
        let newBook = repo.addBook(
            req.body.title,
            repo.getAuthor(parseInt(req.body.author)),
            req.body.language,
            req.body.publisher,
            req.body.ISBN
        );
        res.redirect('/books');
    }
    catch (err) {
        res.render('addBook', {
            title: "Add books",
            error: JSON.stringify(err)
        });
    }
});

module.exports = router;