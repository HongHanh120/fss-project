module.exports = {


  friendlyName: 'Get all tagnames',


  description: 'Get all tagnames.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'ok',
    },

    error: {
      responseType: 'serverError',
    },

    notFound: {
      responseType: 'notFound',
    },

    badRequest: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const checkedUser = await sails.helpers.getInforUser.with({
        accountId: this.req.userId,
        authHeader: this.req.headers.authorization,
      });

      if(!checkedUser) {
        return exits.notFound({
          errorCode: 'NOT_FOUND',
          message: `Could not find the user by id ${this.req.userId}`,
        })
      };

      const allTagname = await Tagname.find();

      if(allTagname.length <= 0) {
        return exits.badRequest({
          message: `There has no tag name to display.`
        })
      };

      return exits.success(allTagname);
    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
