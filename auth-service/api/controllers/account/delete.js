module.exports = {


  friendlyName: 'Delete account',


  description: 'Delete account.',


  inputs: {
    accountId: {
      type: 'number',
      required: true,
    },
  },


  exits: {
    success: {
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError',
    },

    notFound: {
      description: 'Not found the user who has this id',
      responseType: 'notFound'
    },
  },


  fn: async function (inputs, exits) {
    const accountRecord = await Account.findOne({
      id: inputs.accountId
    });

    if(!accountRecord) {
      return exits.notFound({
        errorCode: 'NOT_FOUND',
        message: `User has id ${inputs.accountId} is not found.`,
      });
    }

    const profileRecord = await Profile.findOne({accountId: inputs.accountId});
    if(profileRecord) {
      const updatedRecord = await Profile.update({
        id: profileRecord.id
      }).set({
        avatar: profileRecord.avatar,
        profileName: profileRecord.profileName,
        profilePhone: profileRecord.profilePhone,
        profileAddress: profileRecord.profileAddress,
        sex: profileRecord.sex,
        dateOfBirth: profileRecord.dateOfBirth,
        accountId: null,
      })
      .intercept((err) => {
        return exits.error(err, err.message);
      })
      .fetch();
    }

    await Account.destroy({ id: inputs.accountId })
    .intercept((err) => {
      return exits.error(err, err.message);
    })
    .fetch();

    const deletedAccount = await Account.findOne({
      id: inputs.accountId
    });

    if(deletedAccount) {
      return exits.error({
        message: `Something went wrong when deleting account id ${inputs.accountId}.`
      })
    }

    return exits.success();
  }
};
