module.exports = {


  friendlyName: 'Create new experience',


  description: 'Create new experience.',


  inputs: {
    cvId: {
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

      const existedExperience = await Experience.find({
        cvId: inputs.cvId
      });
      if (existedExperience) {
        for (let ele of existedExperience) {
          if (inputs.oldCompany === ele.oldCompany) {
            return exits.badRequest({
              code: 'E_UNIQUE',
              message: `Attribute old company in this record already in database.`,
            })
          }
        }
      }
    
      const experienceRecord = await Experience.create({
        oldCompany: inputs.oldCompany,
        joinDate: inputs.joinDate,
        outDate: inputs.outDate,
        cvId: inputs.cvId,
      }).fetch();

      if(!experienceRecord) {
        return exits.error({
          message: `Something went wrong when created a new experience record.`
        })
      };

      return exits.success(experienceRecord);

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
