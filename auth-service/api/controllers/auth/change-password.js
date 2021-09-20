const bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Change password',


  description: 'Change password.',


  inputs: {
    oldPassword: {
      type: 'string',
      required: true
    },

    newPassword: {
      type: 'string',
      required: true,
      minLength: 10,
      maxLength: 20
    },
    confirmedPassword: {
      type: 'string',
      required: true
    }

  },


  exits: {
    success: {
      description: 'Password was changed!',
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError'
    },

    badRequest: {
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {
    const accountRecord = await Account.findOne({
      id: this.req.userId
    });

    const passwordChecker = await bcrypt.compare(
      inputs.oldPassword, accountRecord.password);
    
    if (!passwordChecker) {
      return exits.badRequest({
        code: 'MISMATCH',
        message: "Please enter the correct password."
      });
    }

    if(inputs.newPassword !== inputs.confirmedPassword){
      return exits.badRequest({
        code: 'MISMATCH',
        message: "Password and confirmed password must be matched."
      });
    };

    const updatedPassword = await Account.update({
      id: this.req.userId
    }).set({
      password: inputs.newPassword
    })
    .intercept((err) => {
      return exits.error(err, err.message);
    })
    .fetch();

    if(!updatedPassword) {
      return exits.error({
        message: 'Something went wrong when changed password.',
      })
    }

    return exits.success();
  }


};
