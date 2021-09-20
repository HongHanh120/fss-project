const nestedPop = require('nested-pop');

module.exports = {


  friendlyName: `Display all tagnames in user's CV`,


  description: `Display all tagnames in user's CV`,


  inputs: {

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
      const checkedUser = await sails.helpers.getInforUser.with({
        accountId: this.req.userId,
        authHeader: this.req.headers.authorization,
      });

      if(!checkedUser) {
        return exits.notFound({
          errorCode: 'NOT_FOUND',
          message: `Could not find the user's infor by the given id`,
        });
      };

      const existedCV = await Cv.findOne({
        accountId: this.req.userId,
      });

      if(!existedCV) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `User's id ${this.req.userId} does not have CV.`,
        })
      };

      const existedCVTagname = await CvTagname.find({
        cv: existedCV.id
      });

      if(existedCVTagname.length <= 0) {
        return exits.notFound({
          message: `User's CV does not have any tagname.`,
        })
      }
    
      const populatedRecord = await CvTagname.find({
        cv: existedCV.id
      })
      .populate('tagname');

      let tagnames = [];
      for(let record of populatedRecord) {
        const tagname = {
          id: '',
          name: '',
        };
        tagname.id = record.tagname.id;
        tagname.name = record.tagname.tagname;
        tagnames.push(tagname);
      }

      const result = {
        cv: await Cv.findOne({
          accountId: this.req.userId,
        })
        .populate('experiences')
        .populate('programingLanguages'),
        tagname: tagnames
      };

      return exits.success(result);

    } catch (err) {
      return exits.error(err, err.message);
    }

  }

};
