module.exports = {


  friendlyName: 'Update account',


  description: 'Update account.',


  inputs: {
    accountId: {
      type: 'number',
      required: true,
    },

    joiningDate: {
      type: 'ref',
      columnType: 'datetime',
      example: '20-01-2021',
    },

    officialDate: {
      type: 'ref',
      columnType: 'datetime',
      example: '20-01-2021',
    },
    
    contactType: {
      type: 'string',
      defaultsTo: 'email',
    },

    position: {
      type: 'string',
      defaultsTo: 'staff',
    },

    idCard: {
      type: 'string'
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

    const updatedAccount = await Account.update({
      id: inputs.accountId
    }).set({
      password: accountRecord.password,
      joiningDate: inputs.joiningDate,
      officialDate: inputs.officialDate,
      contactType: inputs.contactType,
      position: inputs.position,
      idCard: inputs.idCard,
    })
    .intercept((err) => {
      return exits.error(err, {
        message: `Something went wrong when updated account id ${inputs.accountId}.`
      });
    })
    .fetch();

    return exits.success(updatedAccount);
  }
};
