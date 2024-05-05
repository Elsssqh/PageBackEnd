const { Book } = require('../../../models');

// Fungsi untuk mendapatkan semua buku
async function getBooks() {
  return Book.find({});
}

//Get Book detail
async function getBook(id) {
  return Book.findById(id);
}

/**
 * Handle create book request
 * @param {string} name - Book name
 * @param {string} author - Book author
 * @param {number} stock - Book stock
 * @param {number} price - Book price
 * @param {string} category - Book category
 * @param {string} description - Book description
 * @param {string} image - URL of the book image
 * @returns {object} Created book details
 * @throws {Error} If there's an error creating the book
 */
async function createBook(name, author, stock, price, category, description, image) {
  return Book.create({
    name,
    author,
    stock,
    price,
    category,
    description,
    image,
  });
}

/**
 * Handle update book request
 * @param {string} id - Book ID
 * @param {string} name - Book name
 * @param {string} author - Book author
 * @param {number} stock - Book stock
 * @param {number} price - Book price
 * @param {string} category - Book category
 * @param {string} description - Book description
 * @param {string} image - URL of the book image
 * @returns {object} Updated book details
 * @throws {Error} If there's an error updating the book
 */
async function updateBook(
  id,
  name,
  author,
  stock,
  price,
  category,
  description,
  image
) {
  return Book.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        author,
        stock,
        price,
        category,
        description,
        image,
      },
    }
  );
}

/**
 * Handle delete book request
 * @param {string} id - Book ID
 * @throws {Error} If there's an error deleting the book
 */

async function deleteBook(id) {
  return Book.deleteOne({ _id: id });
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
