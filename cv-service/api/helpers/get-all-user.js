const request = require('request');

module.exports = {


  friendlyName: 'Get all user',


  description: 'Get all user account who has role is = 2',


  inputs: {
    authHeader: {
      type: 'string',
      required: true,
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'All user',
    },

  },


  fn: async function (inputs, exits) {

    // Get all user.
    // TODO
    const options = {
      url: 'http://localhost:1337/api/v1/account',
      headers: {
        'Authorization': inputs.authHeader,
      }
    };

    await request.get(options, function(err, httpResponse, body) {
      if(err) {
        return httpResponse.badResquest(err);
      } else {
        const data = JSON.parse(body);
        // Send back the result through the success exit.
        if (data.statusCode === 200) {
          return exits.success(data.data);
        };
      };
    });
  }
};

