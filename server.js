const express = require('express');
const app = express();
const path = require('path');


app.use(function ( req, res, next )  {
    console.log(req.url);
    next();
});

const homeRouter = require('./routes/home.router');
const booksRouter = require('./routes/books.router');
const authorRouter = require('./routes/author.router');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));

app.use('/', homeRouter);
app.use('/books', booksRouter);
app.use('/author', authorRouter);


app.listen(80);