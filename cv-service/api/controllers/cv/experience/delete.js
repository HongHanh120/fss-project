module.exports = {


  friendlyName: 'Delete experience',


  description: `Delete user's experience.`,


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
  },


  fn: async function (inputs, exits) {
    try {
      const existedExperience = await Experience.findOne({
        id: inputs.id,
      });

      if(!existedExperience) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `Experience id ${inputs.id} is not found.`,
        })
      }

      const existedCV = await Cv.findOne({
        id: existedExperience.cvId,
        accountId: this.req.userId,
      });

      if(!existedCV) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `User's id ${this.req.userId} has not this experience CV.`,
        })
      };
    
      await Experience.destroy({ id: inputs.id }).fetch();

      const deletedExp = await Experience.findOne({
        id: inputs.id,
      });

      if(deletedExp) {
        return exits.error({
          message: `Something went wrong when deleted the experience record.`
        })
      };

      return exits.success();

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
