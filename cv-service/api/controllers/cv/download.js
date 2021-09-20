const json2csv = require('json2csv').parse;
const moment = require('moment')

module.exports = {


  friendlyName: 'Download',


  description: 'Download cv file (returning a stream).',


  inputs: {
    id: {
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

    forbidden: {
      responseType: 'forbidden',
    },
  },


  fn: async function (inputs, exits) {

    try {
      const existedCV = await Cv.findOne({
        id: inputs.id,
      })
      .populate('experiences')
      .populate('programingLanguages');

      if (!existedCV) {
        return exits.notFound({
          code: 'NOT_FOUND',
          message: `CV id ${inputs.id} is not found.`,
        });
      };

      const checkedUser = await sails.helpers.getInforUser.with({
        accountId: existedCV.accountId,
        authHeader: this.req.headers.authorization,
      });

      if(!checkedUser) {
        return exits.notFound({
          errorCode: 'NOT_FOUND',
          message: `Could not find the user by id ${existedCV.accountId}`,
        })
      };

      if(this.req.roleId === 1 || 
        (this.req.roleId === 2 && this.req.userId === existedCV.accountId)){

        const entity = {
          cvId: existedCV.id,
          accountId: existedCV.accountId,
          email: checkedUser.email,
          location: existedCV.location,
          skill: existedCV.skill,
          product: existedCV.product,
          linkImg: existedCV.link_img,
          experiences: existedCV.experiences,
          programingLanguages: existedCV.programingLanguages,
        };

        fields = [
          'cvId', 'accountId', 'email',
          'location', 'skill', 'product',
          'linkImg', 'experiences', 'programingLanguages'
        ];
        const csv = json2csv(entity, fields);

        const fileName = 'cv - ' + inputs.id + ' - ' 
                          + moment().format('DD-MM-YYYY') + '.csv';

        this.res.attachment(fileName);
        return exits.success(csv);             
      } else {
        return exits.forbidden({
          message: 'You do not have permission to access this action.'
        })
      };

    } catch(err) {
      return exits.error(err, err.message);
    }

  }


};
