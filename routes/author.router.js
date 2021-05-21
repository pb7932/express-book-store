const express = require('express');
const repo = require('../repositories/book.repo');
const router = express.Router();

router.get('/:id([0-9]{1,10})', function( req, res, next ) {
    let id = Number(req.params.id);

    let author;
    
    for ( let book of repo.books ) {
        if(book.author.id == id) {
            author = book.author;
            break;
        }
    }

    if(author) {
        res.render('author', {author: author, title: 'My favourite author'});
    }
    else {
        res.status(404).send('Are you gessing?');
    }
});

module.exports = router;