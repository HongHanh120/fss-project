module.exports = {


  friendlyName: `Get infor's account`,


  description: `Get infor's account.`,


  inputs: {
    // accountId: {
    //   type: 'number',
    //   required: true,
    // }
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
      let accountId = this.req.query.accountId;

      let accountRecord = await Account.findOne({
        id: accountId
      });

      if(!accountRecord) {
        return exits.notFound({
          errorCode: 'NOT_FOUND',
          message: `User has id ${accountId} is not found`,
        });
      };

      if(this.req.roleId === 1 || 
        (this.req.roleId === 2 && this.req.userId == accountId)) {
          return exits.success(accountRecord);
      } else {
        return exits.forbidden({
          message: 'You do not have permission to access this action.',
        });
      };
    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
