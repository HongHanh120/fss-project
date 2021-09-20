const nestedPop = require('nested-pop');

module.exports = {


  friendlyName: 'Create a new tagname in cv',


  description: 'Create a new tagname in cv.',


  inputs: {
    tagnameId: {
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

    badRequest: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const existedCV = await Cv.findOne({
        accountId: this.req.userId,
      });

      if(!existedCV) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `User's id ${this.req.userId} has not CV.`,
        })
      };

      const existedTagname = await Tagname.findOne({
        id: inputs.tagnameId,
      });

      if(!existedTagname) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `Tagname id ${inputs.tagnameId} is not existed.`,
        })
      };

      const existedCvTagname = await CvTagname.findOne({
        cv: existedCV.id,
        tagname: existedTagname.id,
      });

      if(existedCvTagname) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `Tagname id ${inputs.tagnameId} has already in this CV ${existedCV.id}.`,
        })
      };

      const record = await CvTagname.create({
        cv: existedCV.id,
        tagname: inputs.tagnameId,
      }).fetch();

      if(!record) {
        return exits.error({
          message: `Something went wrong when created a new cv - tagname record.`
        })
      }
      
      await CvTagname.findOne({
        cv: record.cv,
        tagname: record.tagname,
      })
      .populate('cv')
      .populate('tagname')
      .then(function(populatedRecord) {
        return nestedPop(populatedRecord, {
          cv: [
            'experiences', 'programingLanguages'
          ]
        }).then(function(populatedRecord) {
          return exits.success(populatedRecord)
        }).catch(function(err) {
          throw err;
        });
      }).catch(function(err) {
        throw err;
      });
    } catch(err) {
    return exits.error(err, err.message);
    };
  }
};
