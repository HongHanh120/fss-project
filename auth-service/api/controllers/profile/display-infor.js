module.exports = {


  friendlyName: 'Display infor user',


  description: 'Display infor user',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const profileRecord = await Profile.findOne({
        accountId: this.req.userId
      });

      if(!profileRecord) {
        const newRecord = await Profile.create({
          accountId: this.req.userId
        })
        .intercept('SERVER_ERROR', () => {
          return `Something went wrong when created a new profile has account id ${this.req.userId}.`;
        })
        .fetch();

        return exits.success(newRecord);
      }
      
      return exits.success(profileRecord);

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
