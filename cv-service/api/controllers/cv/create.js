const request = require("request");

module.exports = {


  friendlyName: 'Create CV',


  description: `Create a user's CV.`,


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

    programingLanguage: {
      type: 'string',
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
        accountId: this.req.userId,
      });

      if(existedCV) {
        return exits.badRequest({
          code: 'E_UNIQUE',
          message: `User's id ${this.req.userId} already has CV.`,
        })
      };

      const CVRecord = await Cv.create({
        location: inputs.location,
        skill: inputs.skill,
        product: inputs.product,
        linkImg: inputs.linkImg,
        accountId: this.req.userId,
        roleId: this.req.roleId,
      }).fetch();

      if(!CVRecord) {
        return exits.error({
          message: `Something went wrong when created a new user's CV.`
        })
      };

      const experienceRecord = await Experience.create({
        oldCompany: inputs.oldCompany,
        joinDate: inputs.joinDate,
        outDate: inputs.outDate,
        cvId: CVRecord.id,
      }).fetch();

      if(!experienceRecord) {
        return exits.error({
          message: `Something went wrong when created a new experience record.`
        })
      };

      const proLanguageRecord = await Programinglanguage.create({
        name: inputs.programingLanguage,
        cvId: CVRecord.id,
      }).fetch();

      if(!proLanguageRecord) {
        return exits.error({
          message: `Something went wrong when created a new programing language record.`
        });
      };

      return exits.success({
        cv: CVRecord,
        experience: experienceRecord,
        programingLanguage: proLanguageRecord,
      });

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
