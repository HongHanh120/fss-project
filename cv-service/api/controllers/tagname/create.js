module.exports = {


  friendlyName: 'Create tag name',


  description: 'Create a new tag name.',


  inputs: {
    tagname: {
      type: 'string',
      required: true,
      unique: true,
    }
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

      const allTagname = await Tagname.find();

      for (let ele of allTagname) {
        if(inputs.tagname === ele.tagname){
          return exits.badRequest({
            code: 'E_UNIQUE',
            message: `Tagname ${inputs.tagname} has already in database.`
          });
        };
      };

      const tagnameRecord = await Tagname.create({
        tagname: inputs.tagname,
      }).fetch();

      if(!tagnameRecord) {
        return exits.error({
          message: `Something went wrong when created a new tagname.`
        })
      };

      return exits.success(tagnameRecord);
    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
