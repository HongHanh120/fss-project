module.exports = {


  friendlyName: 'Delete CV',


  description: 'Delete CV by the given id.',


  inputs: {
    id: {
      type: 'number',
      required: true,
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

    forbidden: {
      responseType: 'forbidden',
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
          message: `Could not find the user's by the id in request`,
        })
      };

      const existedCV = await Cv.findOne({
        id: inputs.id,
      });

      if(!existedCV) {
        return exits.notFound({
          code: 'NOT FOUND',
          message: `CV id ${inputs.id} is not found.`,
        });
      };

      if(this.req.roleId === 1 || 
        this.req.roleId === 2 && this.req.userId === existedCV.accountId){

        await Cv.destroy({id: existedCV.id}).fetch();

        const deletedCV = await Cv.findOne({
          id: existedCV.id,
        });

        if(deletedCV) {
          return exits.error({
            message: `Something went wrong when deleted user's CV.`
          });
        };

        return exits.success();
      } else {
        return exits.forbidden({
          message: 'You do not have permission to access this action.'
        });
      };

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
