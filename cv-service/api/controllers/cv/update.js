module.exports = {


  friendlyName: 'Update CV',


  description: 'Update CV.',


  inputs: {
    location: {
      type: 'string',
    },

    skill: {
      type: 'string',
    },

    product: {
      type: 'string',
    },

    linkImg: {
      type: 'string',
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
        accountId: this.req.userId,
      });

      if(!existedCV) {
        return exits.notFound({
          code: 'NOT FOUND',
          message: `User's id ${this.req.userId} has not this CV.`,
        })
      };

      const CVRecord = await Cv.update({
        id: existedCV.id,
      }).set({
        location: inputs.location,
        skill: inputs.skill,
        product: inputs.product,
        linkImg: inputs.linkImg,
      }).fetch();

      if(!CVRecord) {
        return exits.error({
          message: `Something went wrong when updated user's CV.`
        })
      };

      const CV = await Cv.findOne({
        id: existedCV.id,
      })
      .populate('experiences')
      .populate('programingLanguages');

      return exits.success(CV);

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
