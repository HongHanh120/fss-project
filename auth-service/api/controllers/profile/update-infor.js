module.exports = {


  friendlyName: 'Update infor',


  description: '',


  inputs: {
    avatar: {
      type: 'string'
    },

    profileName: {
      type: 'string',
    },

    profilePhone: {
      type: 'string',
    },

    profileAddress: {
      type: 'string',
    },

    sex: {
      type: 'string'
    },

    dateOfBirth: {
      type: 'ref',
      columnType: 'datetime',
    }
  },


  exits: {
    success: {
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError',
    },

    badRequest: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    try {
      let profileRecord = await Profile.findOne({
        accountId: this.req.userId
      });

      if(!profileRecord) {
        profileRecord = await Profile.create({
          accountId: this.req.userId
        })
        .intercept('SERVER_ERROR', () => {
          return `Something went wrong when created a new profile has account id ${this.req.userId}.`;
        })
        .fetch();
      }

      const updatedRecord = await Profile.update({
        id: profileRecord.id,
      }).set({
        avatar: inputs.avatar,
        profileName: inputs.profileName,
        profilePhone: inputs.profilePhone,
        profileAddress: inputs.profileAddress,
        sex: inputs.sex,
        dateOfBirth: inputs.dateOfBirth
      })
      .intercept('SERVER_ERROR', () => {
        return `Something went wrong when created a new profile has account id ${this.req.userId}.`;
      })
      .fetch();

      return exits.success(updatedRecord);

    } catch (err) {
      return exits.error(err, err.message);
    }
  }
};
