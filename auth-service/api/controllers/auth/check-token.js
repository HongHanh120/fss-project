module.exports = {


  friendlyName: 'Check token',


  description: 'Check token was sent from other servers to verify.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'ok',
    },

    error: {
      responseType: 'serverError',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const data = {
        accountId: this.req.userId,
        roleId: this.req.roleId,
      }
      sails.log(data);
      exits.success(data);
      // return this.res.json(data);
    } catch(err) {
      return exits.error(err, err.message);
    };
  }
};
