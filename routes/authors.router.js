const express = require('express');
const repo = require('../repositories/book.repo');
const router = express.Router();

router.get('/', function ( req, res, next ) {
    res.render('authors', {
        title: 'List of authors',
        authors: repo.authors
    })
});

router.get('/:id([0-9]{1,10})', function( req, res, next ) {
    let id = Number(req.params.id);

    let author = repo.getAuthor(id);

    if(author) {
        res.render('author', {author: author, title: 'Info for ' + author});
    }
    else {
        res.status(404).send('Are you gessing?');
    }
});

router.get('/add', function( req, res, next ) {
    res.render('addAuthor', {title: 'Add author'})
});

router.post('/add', function( req, res, next ) {
    console.log(req.body);
    try {
        let newAuthor = repo.addAuthor(
            req.body.firstName,
            req.body.lastName,
            new Date(req.body.DOB),
            req.body.gender
        );
        res.redirect('/authors');
    }
    catch (err) {
        res.render('addAuthor', {
            title: 'Add author',
            error: JSON.stringify(err)
        });
    }
});
module.exports = router;