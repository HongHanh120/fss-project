module.exports = {


  friendlyName: 'Get CV',


  description: 'Get CV by owner or admin.',


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

    forbidden: {
      responseType: 'forbidden',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const infor = await sails.helpers.getInforUser.with({
        accountId: this.req.userId,
        authHeader: this.req.headers.authorization,
      });

      if(!infor) {
        return exits.notFound({
          errorCode: 'NOT_FOUND',
          message: `Could not find the user's infor by the given id`,
        })
      };

      const existedCV = await Cv.findOne({
        id: inputs.id,
      })
      .populate('experiences')
      .populate('programingLanguages');

      if (!existedCV) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `CV id ${inputs.id} is not found.`,
        });
      };

      if(this.req.roleId === 1 || 
        (this.req.roleId === 2 && this.req.userId === existedCV.accountId)){

        await Cv.update({id: inputs.id}).set({
          viewCount: existedCV.viewCount + 1,
        }).fetch();
        
        return exits.success(existedCV);
      };

      return exits.forbidden({
        message: `You do not have permission for this action.`,
      });

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
