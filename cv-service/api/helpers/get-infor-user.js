const request = require('request');

module.exports = {


  friendlyName: `Get infor's user`,


  description: `Get infor's user.`,


  inputs: {
    accountId: {
      type: 'number',
      required: true,
    },

    authHeader: {
      type: 'string',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    const param = {
      accountId: inputs.accountId,
    }
    const options = {
      url: 'http://localhost:1337/api/v1/account/get/infor',
      qs: param,
      headers: {
        'Authorization': inputs.authHeader,
      }
    };

    await request.get(options, function(err, httpResponse, body) {
      if(err) {
        return httpResponse.badResquest(err);
      } else {

        const data = JSON.parse(body);
        if (data.statusCode === 200) {
          return exits.success(data.data);
        } 
        
        if(data.statusCode === 400) {
          return httpResponse.notFound({
            message: data.message,
          })
        }
      };
    });
  }
};

