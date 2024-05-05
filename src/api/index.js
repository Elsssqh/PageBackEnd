const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const books = require('./components/books/books-route');
const accessories = require('./components/accessories/accessories-route');
// console.log(books);
// console.log(users);
module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  books(app);
  accessories(app);

  return app;
};
