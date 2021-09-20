module.exports = {


  friendlyName: 'Create new programing language',


  description: 'Create a new programing language.',


  inputs: {
    cvId: {
      type: 'number',
      required: true,
    },

    name: {
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

    badRequest: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const existedCV = await Cv.findOne({
        id: inputs.cvId,
        accountId: this.req.userId,
      });

      if(!existedCV) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `User's id ${this.req.userId} has not this CV.`,
        })
      };

      const existedProLanguage = await Programinglanguage.find({
        cvId: inputs.cvId
      });
      if (existedProLanguage) {
        for (let ele of existedProLanguage) {
          if (inputs.name === ele.name) {
            return exits.badRequest({
              code: 'E_UNIQUE',
              message: `Attribute name in this record already in database.`,
            })
          }
        }
      }
    
      const proLanguageRecord = await Programinglanguage.create({
        name: inputs.name,
        cvId: inputs.cvId,
      }).fetch();

      if(!proLanguageRecord) {
        return exits.error({
          message: `Something went wrong when created a new programing language record.`
        })
      };

      return exits.success(proLanguageRecord);

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
