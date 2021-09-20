const generateOpt = require("../../helpers/generate-opt");
const mailService = require("../../services/mailService");

module.exports = {


  friendlyName: 'Reset password',


  description: 'Reset password for user who forgot your password.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    }
  },


  exits: {
    success: {
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError',
    },

    notFound: {
      description: 'Not found the user who has this email',
      responseType: 'notFound'
    },
  },


  fn: async function (inputs, exits) {
    const existedAccount = await Account.findOne({
      email: inputs.email,
    });
    
    if(!existedAccount) {
      return exits.notFound({
        message: `${inputs.email} is not found.`,
      })
    };

    const opt = await sails.helpers.generateOpt.with({ 
      pattern: sails.config.pattern,
    });

    // sails.log(opt);

    let passwordChecker = false;
    while (passwordChecker === false) {
      const updatedPassword = await Account.update({
        id: existedAccount.id,
      }).set ({
        password: opt,
      })
      .intercept((err) => {
        return exits.error(err, err.message);
      })
      .fetch();

      if(updatedPassword) {
        passwordChecker = true;
      }
    };
    
    mailService.resetPassword(opt, inputs.email);
    const data = {};
    const message = `A new password has been sent to your email ${inputs.email}`;

    return exits.success(data, message);
  }


};
