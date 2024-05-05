const booksRepository = require('./books-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooks() {
  const books = await booksRepository.getBooks();

  const results = [];
  for (let i = 0; i < books.length; i += 1) {
    const book = books[i];
    results.push({
      id: book.id,
      name: book.name,
      author: book.author,
      stock: book.stock,
      price: book.price,
      category: book.category,
      description: book.description,
      image: book.image,
    });
  }

  return results;
}
//Get book detail
async function getBook(id) {
  const book = await booksRepository.getBook(id);

  if (!book) {
    return null;
  }

  return {
    id: book.id,
    name: book.name,
    author: book.author,
    stock: book.stock,
    price: book.price,
    category: book.category,
    description: book.description,
    image: book.image,
  };
}

async function createBook(name, author, stock, price, category, description, image) {
  // Anda mungkin perlu melakukan validasi di sini sebelum membuat buku baru

  try {
    // Buat buku baru
    const newBook = await booksRepository.createBook(
      name,
      author,
      stock,
      price,
      category,
      description,
      image
    );

    // Jika buku berhasil dibuat, kembalikan buku yang baru dibuat
    return newBook;
  } catch (err) {
    // Tangani kesalahan
    return null;
  }
}

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
  const book = await booksRepository.getBook(id);

  // Book not found
  if (!book) {
    return null;
  }

  try {
    await booksRepository.updateBook(
      id,
      name,
      author,
      stock,
      price,
      category,
      description,
      image
    );
  } catch (err) {
    return null;
  }

  return true;
}

async function deleteBook(id) {
  const book = await booksRepository.getBook(id);

  // Book not found
  if (!book) {
    return null;
  }

  try {
    await booksRepository.deleteBook(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
