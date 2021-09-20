module.exports = {


  friendlyName: 'Logout account',


  description: 'Logout account.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError',
    },
  },


  fn: async function (inputs, exits) {
    try {
      this.res.cookie('token', 'deleted', {
        expires: new Date(01-01-1970),
        httpOnly: true,
      })

      // sails.log(this.res.cookies);
      return exits.success();
    } catch (err) {
      sails.log(this.req.headers);
    }
  }
};
