module.exports = {


  friendlyName: `Delete one tagname from user's CV`,


  description: `Delete one tagname from user's CV`,


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

      // const existedTagname = await Tagname.findOne({
      //   id: inputs.tagnameId,
      // });

      // if(!existedTagname) {
      //   return exits.notFound({
      //     code: 'NOT_FOUND',
      //     message: `Tagname id ${inputs.tagnameId} is not existed.`,
      //   })
      // };

      const existedCvTagname = await CvTagname.findOne({
        cv: existedCV.id,
        tagname: inputs.tagnameId,
      });

      if(!existedCvTagname) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `User's CV does not have tagname id ${inputs.tagnameId}.`,
        })
      };

      await CvTagname.destroy({
        cv: existedCV.id,
        tagname: inputs.tagnameId,
      }).fetch();

      const deletedCvTagname = await CvTagname.findOne({
        cv: existedCV.id,
        tagname: inputs.tagnameId,
      });

      if(deletedCvTagname) {
        return exits.error({
          message: `Something went wrong when removed tag name id ${inputs.tagnameId} from CV`,
        })
      };

      return exits.success();
      
    } catch(err) {
      return exits.error(err, err.message);
    };

  }


};
