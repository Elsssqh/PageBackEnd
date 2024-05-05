const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const trolleyControllers = require('./trolley-controller');
const trolleyValidator = require('./trolley-validator');

const router = express.Router();

module.exports = (app) => {
  app.use('/trolley', router);
  // Route to get all books
  router.get('/', authenticationMiddleware, trolleyControllers.getTrolleys);

  // Route to get a specific book by ID
  router.get('/:id', authenticationMiddleware, trolleyControllers.getTrolley);

  // Route to create a new book
  router.post(
    '/',
    authenticationMiddleware,
    celebrate(trolleyValidator.createTrolley),
    trolleyControllers.createTrolley
  );

  // Route to update a book by ID
  router.put(
    '/:trolley_id',
    authenticationMiddleware,
    celebrate(trolleyValidator.updateTrolley),
    trolleyControllers.updateTrolley
  );

  //delete a book
  router.delete(
    '/:trolley_id',
    authenticationMiddleware,
    trolleyControllers.deleteTrolley
  );
};
