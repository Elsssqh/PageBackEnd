const trolleyService = require('./trolley-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of books request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getTrolleys(request, response, next) {
  try {
    const trolley = await trolleyService.getTrolleys();
    return response.status(200).json(trolley);
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
async function getTrolley(request, response, next) {
  try {
    const trolley = await trolleyService.getTrolley(request.params.id);

    if (!trolley) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown trolley');
    }

    return response.status(200).json(trolley);
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
async function createTrolley(request, response, next) {
  try {
    const name = request.body.name;
    const stock = request.body.stock;
    const price = request.body.price;
    const image = request.body.image;

    const success = await trolleyService.createTrolley(
      name,
      stock,
      price,
      image
    );
    console.log(success);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create trolley'
      );
    }

    return response.status(200).json({ name, stock, price, image });
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
async function updateTrolley(request, response, next) {
  try {
    const trolley_id = request.params.trolley_id;
    const name = request.body.name;
    const stock = request.body.stock;
    const price = request.body.price;
    const image = request.body.image;

    const success = await trolleyService.updateTrolley(
      trolley_id,
      name,
      stock,
      price,
      image
    );
    console.log(success);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update trolley'
      );
    }

    return response.status(200).json({ trolley_id });
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
async function deleteTrolley(request, response, next) {
  try {
    const trolley_id = request.params.trolley_id;

    const success = await trolleyService.deleteTrolley(trolley_id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete book'
      );
    }

    return response.status(200).json({ trolley_id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTrolleys,
  getTrolley,
  createTrolley,
  updateTrolley,
  deleteTrolley,
};
