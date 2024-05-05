const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
// const bcrypt = require('../../../utils/password')
const bcrypt = require('bcrypt');

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUsers(request, response, next) {
  try {
    const users = await usersService.getUsers();
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown user');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request, response, next) {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const confirmpassword=request.body.confirmpassword;

    // Check if confirmPassword matches password
    if (password !== confirmpassword) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password and confirm password do not match'
      );
    }

    const emailExist = await usersService.getUserByEmail(email)
    if(emailExist){
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'EMAIL ALREADY TAKEN'
      )
    }

    const success = await usersService.createUser(name, email, password,confirmpassword);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(200).json({ name, email, password,confirmpassword });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle change password request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function changePassword(request, response, next) {
  try {
    const userId = request.params.id;
    const newPassword = request.body.newPassword;
    const newConfirmPassword = request.body.newConfirmPassword;

    // Check if newPassword and confirmPassword match and meet length requirement
    if (newPassword !== newConfirmPassword || newPassword.length < 6 || newPassword.length > 32) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'New password and confirm password do not match or do not meet length requirements'
      );
    }

    // Check if oldPassword matches current password
    if(!usersService.comparePassword){
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Old password does not match current password'
      );
    }


    // Update user's password in the database
    const success = await usersService.changePassword(userId, newPassword);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update password'
      );
    }

    return response.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return next(error);
  }
}

// async function emailExist(email){
//   try{
//     const user = await usersService.findOne({email});
//     if(emailExist){
//       throw errorResponder(
//         errorTypes.EMAIL_ALREADY_TAKEN,
//         'Email already exist'
//       );
//     }
//     const success= await usersService.createUser(name, email, password);
//     if(!success){
//       throw errorResponder(
//         errorTypes.UNPROCESSABLE_ENTITY,
//         'confirm'
//       );
//     }
//     return response.status(200).json({ name, email });
//   }catch{

//   }

// }


  

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateUser(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const email = request.body.email;

    const success = await usersService.updateUser(id, name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteUser(request, response, next) {
  try {
    const id = request.params.id;

    const success = await usersService.deleteUser(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * CONFIRM PASSWORD
 * * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword
};
