const { pattern } = require("../../config/local");

module.exports = {


  friendlyName: 'Generate opt',


  description: 'Generate OTP for resetting password.',


  inputs: {
    pattern: {
      type: 'string',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
      outputType: ['string'],
    },

  },


  fn: async function (inputs, exits) {
    let opt = '';
    const optLength = 17;
    for (let i = 0; i < optLength; i++) {
      opt += inputs.pattern[Math.floor(Math.random() * pattern.length)];
    };

    return exits.success(opt);
  }
};

