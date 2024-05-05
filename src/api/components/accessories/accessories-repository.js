const { Accessories } = require('../../../models');

// Fungsi untuk mendapatkan semua accessories
async function getAllAccessories() {
  return Accessories.find({});
}

//Get Book detail
async function getAccessories(id) {
  return Accessories.findById(id);
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
async function createAccessories(
  name,
  author,
  price,
  category,
  description,
  image
) {
  return Accessories.create({
    name,
    author,
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
 * @param {number} price - Book price
 * @param {string} category - Book category
 * @param {string} description - Book description
 * @param {string} image - URL of the book image
 * @returns {object} Updated book details
 * @throws {Error} If there's an error updating the book
 */
async function updateAccessories(
  id,
  name,
  author,
  price,
  category,
  description,
  image
) {
  return Accessories.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        author,
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

async function deleteAccessories(id) {
  return Accessories.deleteOne({ _id: id });
}

module.exports = {
  getAllAccessories,
  getAccessories,
  createAccessories,
  updateAccessories,
  deleteAccessories,
};
