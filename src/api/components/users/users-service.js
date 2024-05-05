const usersRepository = require('./users-repository');
const { hashPassword, newhashedPassword } = require('../../../utils/password');
const { passwordMatched } = require('../../../utils/password');
const { password } = require('../../../models/users-schema');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */

async function getPassword(id){
  const user = await usersRepository.getUser(id);
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    password : user.password
  };
}

async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Check User Email
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {boolean}
 */
async function getUserByEmail(email){
  const user = await usersRepository.checkEmailExists(email);
  // User not found
  if (!user) {
    return null;
  }
  else
    return true;
  }

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

async function comparePassword(password){
  const oldPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const hashedPassword = usersRepository.getPassword(password)
  const passwordMatch = await passwordMatched(oldPassword, hashedPassword);
  if (!passwordMatch) {
    return null
  }else
  return true
  
}
// Compare plaintext password with hashed password


/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update user's password
 * @param {string} id - User ID
 * @param {string} newPassword - New password
 * @returns {boolean}
 */
async function changePassword(id, newPassword) {
  const user = await usersRepository.getUser(id);
  const hashedPassword = await newhashedPassword(newPassword);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.changePassword(id, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}



/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
  comparePassword,
  getPassword
};
