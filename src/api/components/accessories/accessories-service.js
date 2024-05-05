const accessoriesRepository = require('./accessories-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllAccessories() {
  const accessories = await accessoriesRepository.getAllAccessories();

  const results = [];
  for (let i = 0; i < accessories.length; i += 1) {
    const accessory = accessories[i];
    results.push({
      id: accessory.id,
      name: accessory.name,
      stock: accessory.stock,
      price: accessory.price,
      category: accessory.category,
      description: accessory.description,
      image: accessory.image,
    });
  }

  return results;
}

//Get book detail
async function getAccessories(id) {
  const accessories = await accessoriesRepository.getAccessories(id);

  if (!accessories) {
    return null;
  }

  return {
    id: accessories.id,
    name: accessories.name,
    author: accessories.author,
    price: accessories.price,
    category: accessories.category,
    description: accessories.description,
    image: accessories.image,
  };
}

async function createAccessories(
  name,
  author,
  price,
  category,
  description,
  image
) {
  // Anda mungkin perlu melakukan validasi di sini sebelum membuat buku baru

  try {
    // Buat buku baru
    const newAccessories = await accessoriesRepository.createAccessories(
      name,
      author,
      price,
      category,
      description,
      image
    );

    // Jika buku berhasil dibuat, kembalikan buku yang baru dibuat
    return newAccessories;
  } catch (err) {
    // Tangani kesalahan
    return null;
  }
}

async function updateAccessories(
  id,
  name,
  author,
  price,
  category,
  description,
  image
) {
  const accessories = await accessoriesRepository.getAccessories(id);

  // Book not found
  if (!accessories) {
    return null;
  }

  try {
    await accessoriesRepository.updateAccessories(
      id,
      name,
      author,
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

async function deleteAccessories(id) {
  const accessories = await accessoriesRepository.getBook(id);

  // Book not found
  if (!accessories) {
    return null;
  }

  try {
    await accessoriesRepository.deleteAccessories(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getAllAccessories,
  getAccessories,
  createAccessories,
  updateAccessories,
  deleteAccessories,
};
