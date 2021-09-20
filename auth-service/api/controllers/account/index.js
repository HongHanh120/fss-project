module.exports = {


  friendlyName: `List all user's accounts`,


  description: `List all user's accounts.`,


  inputs: {

  },


  exits: {
    success: {
      description: `List all accounts of company's user`,
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError'
    }
  },


  fn: async function (inputs, exits) {
    try {
      const allAccounts = await Account.find({roleId: 2});

      let omitedAccounts = [];
      for (let account of allAccounts) {
        account = _.omit(account, ['contactType', 'idCard', 'roleId', 'password']);
        omitedAccounts.push(account);
      };

      return exits.success(omitedAccounts);
    } catch(err) {
      return exits.error(err, err.message);
    }
  }
};
