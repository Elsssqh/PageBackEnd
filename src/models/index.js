const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const bookSchema = require('./book-schema');
const accessoriesSchema = require('./accessories-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));
const Book = mongoose.model('books', mongoose.Schema(bookSchema));
const Accessories = mongoose.model(
  'accessories',
  mongoose.Schema(accessoriesSchema)
);

module.exports = {
  mongoose,
  User,
  Book,
  Accessories,
};