const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      confirmpassword:joi.string().min(6).max(32).required()
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  changePassword: {
    body: {
      oldPassword : joi.string().min(6).max(32).required().label('Password'),
      newPassword : joi.string().min(6).max(32).required().label('New Password'),
      newConfirmPassword:joi.string().min(6).max(32).required().label('New Confir, Password')
    },
  },

};
