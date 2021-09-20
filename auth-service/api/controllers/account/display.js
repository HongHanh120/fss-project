module.exports = {


  friendlyName: 'Display one account',


  description: 'Display one account.',


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
  },


  fn: async function (inputs, exits) {
    let accountId = this.req.userId;

    let accountRecord = await Account.findOne({id: accountId});

    if(!accountRecord) {
      return exits.notFound({
        errorCode: 'NOT_FOUND',
        message: `User has id ${this.req.userId} is not found`,
      });
    }

    return exits.success(accountRecord);
  }
};
