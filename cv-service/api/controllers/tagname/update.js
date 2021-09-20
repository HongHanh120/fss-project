module.exports = {


  friendlyName: 'Update',


  description: 'Update tagname.',


  inputs: {
    id: {
      type: 'number',
      required: true,
    },

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

      const tagnameRecord = await Tagname.findOne({
        id: inputs.id,
      });

      if(!tagnameRecord) {
        return exits.notFound({
          errorCode: 'NOT_FOUND',
          message: `Could not find the tag name by id ${inputs.id}`,
        })
      }

      const allTagname = await Tagname.find();

      for (let ele of allTagname) {
        if(inputs.tagname === ele.tagname){
          return exits.badRequest({
            code: 'E_UNIQUE',
            message: `Tagname ${inputs.tagname} has already in database.`
          });
        };
      };

      const updatedTagname = await Tagname.update({
        id: inputs.id,
      }).set({
        tagname: inputs.tagname,
      }).fetch();

      if(!updatedTagname) {
        return exits.error({
          message: `Something went wrong when updated tagname by the given id ${inputs.id}.`
        })
      };

      return exits.success(updatedTagname);
    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
