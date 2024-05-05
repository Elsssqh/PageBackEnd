const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const BookControllers = require('./books-controller');
const BookValidator = require('./books-validator');

const router = express.Router();

module.exports = (app) => {
  app.use('/books', router);
  // Route to get all books
  router.get('/', authenticationMiddleware, BookControllers.getBooks);

  // Route to get a specific book by ID
  router.get('/:id', authenticationMiddleware, BookControllers.getBook);

  // Route to create a new book
  router.post(
    '/',
    authenticationMiddleware,
    celebrate(BookValidator.createBook),
    BookControllers.createBook
  );

  // Route to update a book by ID
  router.put(
    '/:book_id',
    authenticationMiddleware,
    celebrate(BookValidator.updateBook),
    BookControllers.updateBook
  );

  //delete a book
  router.delete(
    '/:book_id',
    authenticationMiddleware,
    BookControllers.deleteBook
  );
};
