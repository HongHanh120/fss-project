module.exports = {


  friendlyName: 'Update a programinglanguage',


  description: 'Update a programinglanguage.',


  inputs: {
    id: {
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
      const existedProLanguage = await Programinglanguage.findOne({
        id: inputs.id,
      });

      if(!existedProLanguage) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `Programing language id ${inputs.id} is not found.`,
        })
      }

      const existedCV = await Cv.findOne({
        id: existedProLanguage.cvId,
        accountId: this.req.userId,
      });

      if(!existedCV) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `User's id ${this.req.userId} has not this programing language in CV.`,
        })
      };

      const proLanguageRecords = await Programinglanguage.find({
        cvId: existedProLanguage.cvId,
      });
      
      for (let ele of proLanguageRecords) {
        if (inputs.name === ele.name) {
          return exits.badRequest({
            code: 'E_UNIQUE',
            message: `Attribute name in this record already in database.`,
          })
        }
      };
    
      const proLanguageRecord = await Programinglanguage.update({
        id: inputs.id,
      }).set({
        name: inputs.name,
      }).fetch();

      if(!proLanguageRecord) {
        return exits.error({
          message: `Something went wrong when updated the programing language record.`
        })
      };

      return exits.success(proLanguageRecord);

    } catch (err) {
      return exits.error(err, err.message);
    };
  }
};
