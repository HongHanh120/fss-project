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
    try {
      const existedRole = await Role.findOne({ roleName: inputs.roleName });
      if(existedRole) return exits.badRequest({
        code: 'E_UNIQUE', 
        message: 'There has already this role.'
      });

      const roleRecord = await Role.create({
        roleName: inputs.roleName,
      }).fetch();

      if(!roleRecord) {
        return exits.error({
          message: 'It had problem when created a new role.'
        })
      };

      return exits.success(roleRecord);
    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
