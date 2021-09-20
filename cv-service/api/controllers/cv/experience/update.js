module.exports = {


  friendlyName: 'Update an experience',


  description: 'Update an experience.',


  inputs: {
    id: {
      type: 'number',
      required: true,
    },

    oldCompany: {
      type: 'string',
    },

    joinDate: {
      type: 'ref',
      columnType: 'datetime',
      example: '20-01-2021',
    },

    outDate: {
      type: 'ref',
      columnType: 'datetime',
      example: '20-01-2021',
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
          message: `User's id ${this.req.userId} has not this experience in CV.`,
        })
      };

      const expRecords = await Experience.find({
        cvId: existedExperience.cvId,
      });
      
      for (let ele of expRecords) {
        if (inputs.oldCompany === ele.oldCompany) {
          return exits.badRequest({
            code: 'E_UNIQUE',
            message: `Attribute old company in this record already in database.`,
          })
        }
      };
    
      const experienceRecord = await Experience.update({
        id: inputs.id,
      }).set({
        oldCompany: inputs.oldCompany,
        joinDate: inputs.joinDate,
        outDate: inputs.outDate,
      }).fetch();

      if(!experienceRecord) {
        return exits.error({
          message: `Something went wrong when updated the experience record.`
        })
      };

      return exits.success(experienceRecord);

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
