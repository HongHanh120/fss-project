module.exports = {


  friendlyName: 'Create role',


  description: 'Create a new role.',


  inputs: {
    roleName: {
      type: 'string',
      required: true,
      unique: true,
      allowNull: false
    }
  },


  exits: {
    success: {
      description: 'A new role was created!',
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
    const roleRecord = await Role.create({
      roleName: inputs.roleName,
    })
    .intercept('E_UNIQUE', (err) => {
      return exits.badRequest(err);
    })
    .fetch();

    if(!roleRecord) {
      return exits.error({
        message: 'It had problem when created a new role.'
      })
    };

    return exits.success(roleRecord);
  }
};
