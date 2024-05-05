const { Trolley } = require('../../../models');

// Fungsi untuk mendapatkan semua buku
async function getTrolleys() {
  return Trolley.find({});
}

//Get Book detail
async function getTrolley(id) {
  return Trolley.findById(id);
}

/**
 * Handle create book request
 * @param {string} name - Book name
 * @param {string} author - Book author
 * @param {number} price - Book price
 * @param {string} category - Book category
 * @param {string} description - Book description
 * @param {string} image - URL of the book image
 * @returns {object} Created book details
 * @throws {Error} If there's an error creating the book
 */
async function createTrolley(name, stock, price, image) {
  return Trolley.create({
    name,
    stock,
    price,
    image,
  });
}

/**
 * Handle update book request
 * @param {string} id - Book ID
 * @param {string} name - Book name
 * @param {string} author - Book author
 * @param {number} price - Book price
 * @param {string} category - Book category
 * @param {string} description - Book description
 * @param {string} image - URL of the book image
 * @returns {object} Updated book details
 * @throws {Error} If there's an error updating the book
 */
async function updateTrolley(id, name, stock, price, image) {
  return Trolley.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        stock,
        price,
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

async function deleteTrolley(id) {
  return Trolley.deleteOne({ _id: id });
}

module.exports = {
  getTrolleys,
  getTrolley,
  createTrolley,
  updateTrolley,
  deleteTrolley,
};
