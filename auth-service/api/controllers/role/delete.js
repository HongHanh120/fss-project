module.exports = {


  friendlyName: 'Delete',


  description: 'Delete the role by the given id.',


  inputs: {
    roleId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      responseType: 'ok',
    },

    error: {
      responseType: 'serverError',
    },

    badRequest: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    const existedRole = await Role.findOne({
      id: inputs.roleId,
    })
    if(!existedRole) {
      return exits.badRequest({
        code: 'NOT_FOUND',
        message: `Could not found role by the given id ${inputs.roleId}`,
      })
    }

    const userWithRole = await Account.find({ roleId: inputs.roleId });
    if (userWithRole.length > 0) {
      for( let user of userWithRole ) {
        user = await Account.update({
          id: user.id
        }).set({
          password: user.password,
          roleId: null
        })
        .intercept((err) => {
          return exits.error(err, err.message);
        })
        .fetch();
      }
    }

    await Role.destroy({ id: inputs.roleId })
    .intercept((err) => {
      return exits.error(err, err.message);
    })
    .fetch();

    const deletedRole = await Role.findOne({
      id: inputs.roleId,
    })

    if(deletedRole) {
      return exits.error({
        message: `Something went wrong when deleted role by the given id ${inputs.roleId}.`
      });
    };

    return exits.success();
  }
};
