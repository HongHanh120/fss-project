module.exports = {


  friendlyName: 'Index',


  description: 'Get all roles',


  inputs: {

  },


  exits: {
    success: {
      description: `List all roles in db`,
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError'
    }
  },


  fn: async function (inputs, exits) {
    try {
      const allRoles = await Role.find();
      return exits.success(allRoles);
    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
