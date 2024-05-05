const bookService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of books request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getBooks(request, response, next) {
  try {
    const books = await bookService.getBooks();
    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get book detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getBook(request, response, next) {
  try {
    const book = await bookService.getBook(request.params.id);

    if (!book) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown book');
    }

    return response.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create book request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createBook(request, response, next) {
  try {
    const name = request.body.name;
    const author = request.body.author;
    const stock = request.body.stock;
    const price = request.body.price;
    const category = request.body.category;
    const description = request.body.description;
    const image = request.body.image;

    // You can add additional validation here if necessary

    const success = await bookService.createBook(
      name,
      author,
      stock,
      price,
      category,
      description,
      image
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create book'
      );
    }

    return response
      .status(200)
      .json({ name, author, stock, price, category, description, image });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update book request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateBook(request, response, next) {
  try {
    const book_id = request.params.book_id;
    const name = request.body.name;
    const author = request.body.author;
    const stock = request.body.stock;
    const price = request.body.price;
    const category = request.body.category;
    const description = request.body.description;
    const image = request.body.image;

    const success = await bookService.updateBook(
      book_id,
      name,
      author,
      stock,
      price,
      category,
      description,
      image
    );
    console.log(success);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update book'
      );
    }

    return response.status(200).json({ book_id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete book request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteBook(request, response, next) {
  try {
    const book_id = request.params.book_id;

    const success = await bookService.deleteBook(book_id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete book'
      );
    }

    return response.status(200).json({ book_id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
