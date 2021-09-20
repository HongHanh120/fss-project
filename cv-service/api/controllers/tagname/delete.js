module.exports = {


  friendlyName: 'Delete tag name',


  description: 'Delete tag name.',


  inputs: {
    id: {
      type: 'number',
      required: true,
    },
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
    }
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

      const tagnameRecord = await Tagname.findOne({
        id: inputs.id,
      });

      if(!tagnameRecord) {
        return exits.notFound({
          errorCode: 'NOT_FOUND',
          message: `Could not find the tag name by id ${inputs.id}`,
        })
      }

      await Tagname.destroy({ id: inputs.id }).fetch();

      const deletedTagname = await Tagname.findOne({
        id: inputs.id,
      });

      if(deletedTagname) {
        return exits.error({
          message: `Something went wrong when deleted tagname by the given id ${inputs.id}.`
        })
      };

      return exits.success();
    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
