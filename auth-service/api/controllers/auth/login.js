const bcrypt = require('bcrypt');

const jwtServie = require('../../services/jwToken');

module.exports = {


  friendlyName: 'Login',


  description: 'Login account.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true
    },

    password: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError',
    },

    badRequest: {
      description: 'Missing email, password; Email is not valid',
      responseType: 'badRequest'
    },

    notFound: {
      description: 'Not found the user who has this email',
      responseType: 'notFound'
    },
  },


  fn: async function (inputs, exits) {
    try {
      const account = await Account.findOne({
        email: inputs.email
      });

      if(!account) {
        return exits.notFound({
          errorCode: 'NOT_FOUND',
          message: `${inputs.email} is not found.`,
        });
      }

      const passwordChecker = await bcrypt.compare(inputs.password, account.password);
      if(!passwordChecker) {
        return exits.badRequest({
          code: 'MISMATCH',
          message: 'Please enter the correct password.'
        });
      }

      const token = jwtServie.generateToken({userId: account.id, roleId: account.roleId});
      this.res.cookie('token', token, { httpOnly: true });

      return exits.success({
        email: inputs.email,
        token: token,
      });
    } catch (err) {
      return exits.error(err, err.message);
    };
  }
};
