const accessoriesService = require('./accessories-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of books request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getAllAccessories(request, response, next) {
  try {
    const accessories = await accessoriesService.getAllAccessories();
    return response.status(200).json(accessories);
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
async function getAccessories(request, response, next) {
  try {
    const accessories = await bookService.getAccessories(request.params.id);

    if (!accessories) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown accessories');
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
async function createAccessories(request, response, next) {
  try {
    const name = request.body.name;
    const stock = request.body.stock;
    const price = request.body.price;
    const category = request.body.category;
    const description = request.body.description;
    const image = request.body.image;

    // You can add additional validation here if necessary

    const success = await accessoriesService.createAccessories(
      name,
      stock,
      price,
      category,
      description,
      image
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create accessories'
      );
    }

    return response
      .status(200)
      .json({ name, stock, price, category, description, image });
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
async function updateAccessories(request, response, next) {
  try {
    const accessories_id = request.params.accessories_id;
    const name = request.body.name;
    const stock = request.body.stock;
    const price = request.body.price;
    const category = request.body.category;
    const description = request.body.description;
    const image = request.body.image;

    const success = await accessoriesService.updateAccessories(
      accessories_id,
      name,
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
        'Failed to update accessories'
      );
    }

    return response.status(200).json({ accessories_id });
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
async function deleteAccessories(request, response, next) {
  try {
    const accessories_id = request.params.accessories_id;

    const success = await accessoriesService.deleteAccessories(accessories_id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete book'
      );
    }

    return response.status(200).json({ accessories_id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllAccessories,
  getAccessories,
  createAccessories,
  updateAccessories,
  deleteAccessories,
};
