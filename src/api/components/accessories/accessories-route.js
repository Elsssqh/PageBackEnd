const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const accessoriesControllers = require('./accessories-controller');
const accessoriesValidator = require('./accessories-validator');

const router = express.Router();

module.exports = (app) => {
  app.use('/accessories', router);
  // Route to get all books
  router.get(
    '/',
    authenticationMiddleware,
    accessoriesControllers.getAllAccessories
  );

  // Route to get a specific book by ID
  router.get(
    '/:id',
    authenticationMiddleware,
    accessoriesControllers.getAccessories
  );

  // Route to create a new book
  router.post(
    '/',
    authenticationMiddleware,
    celebrate(accessoriesValidator.createAccessories),
    accessoriesControllers.createAccessories
  );

  // Route to update a book by ID
  router.put(
    '/:book_id',
    authenticationMiddleware,
    celebrate(accessoriesValidator.updateAccessories),
    accessoriesControllers.updateAccessories
  );

  //delete a book
  router.delete(
    '/:book_id',
    authenticationMiddleware,
    accessoriesControllers.deleteAccessories
  );
};
