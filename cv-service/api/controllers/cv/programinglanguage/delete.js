module.exports = {


  friendlyName: 'Delete programing language',


  description: 'Delete a programing language.',


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
      const existedProgramingLanguage = await Programinglanguage.findOne({
        id: inputs.id,
      });

      if(!existedProgramingLanguage) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `Programing language id ${inputs.id} is not found.`,
        })
      }

      const existedCV = await Cv.findOne({
        id: existedProgramingLanguage.cvId,
        accountId: this.req.userId,
      });

      if(!existedCV) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `User's id ${this.req.userId} has not this programing language in CV.`,
        })
      };
    
      await Programinglanguage.destroy({ id: inputs.id }).fetch();

      const deletedProLanguage = await Programinglanguage.findOne({
        id: inputs.id,
      });

      if(deletedProLanguage) {
        return exits.error({
          message: `Something went wrong when deleted the programing language record.`
        })
      };

      return exits.success();

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
