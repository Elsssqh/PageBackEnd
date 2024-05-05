const trolleyRepository = require('./trolley-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getTrolleys() {
  const trolley = await trolleyRepository.getTrolleys();

  const results = [];
  for (let i = 0; i < trolley.length; i += 1) {
    const item = trolley[i];
    results.push({
      id: item.id,
      name: item.name,
      stock: item.stock,
      price: item.price,
      image: item.image,
    });
  }

  return results;
}

//Get book detail
async function getTrolley(id) {
  const trolley = await trolleyRepository.getTrolley(id);

  if (!trolley) {
    return null;
  }

  return {
    id: trolley.id,
    name: trolley.name,
    stock: trolley.stock,
    price: trolley.price,
    image: trolley.image,
  };
}

async function createTrolley(name, stock, price, image) {
  try {
    const newTrolley = await trolleyRepository.createTrolley(
      name,
      stock,
      price,
      image
    );
    return newTrolley;
  } catch (err) {
    return null;
  }
}

async function updateTrolley(id, name, stock, price, image) {
  const trolley = await trolleyRepository.getTrolley(id);

  // Trolley not found
  if (!trolley) {
    return null;
  }

  try {
    await trolleyRepository.updateTrolley(id, name, stock, price, image);
  } catch (err) {
    return null;
  }

  return true;
}

async function deleteTrolley(id) {
  const trolley = await trolleyRepository.getTrolley(id);

  // Book not found
  if (!trolley) {
    return null;
  }

  try {
    await trolleyRepository.deleteTrolley(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getTrolleys,
  getTrolley,
  createTrolley,
  updateTrolley,
  deleteTrolley,
};
