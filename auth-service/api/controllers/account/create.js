module.exports = {


  friendlyName: 'Sign in',


  description: 'Sign in account.',


  inputs: {
    userCode: {
      type: 'string',
      description: `User code's user in company`,
      example: 'F00020',
    },

    password: {
      type: 'string',
      required: true,
      minLength: 10,
      maxLength: 20
    },

    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
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

    roleId: {
      type: 'number',
      defaultsTo: 2 // staff has role_id = 2
    },
  },


  exits: {
    success: {
      description: 'A new account was created!',
      responseType: 'ok'
    },

    error: {
      responseType: 'serverError'
    },

    badRequest: {
      responseType: 'badRequest'
    },

    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    const existedRole = await Role.findOne({
      id: inputs.roleId,
    });

    if(!existedRole) {
      return exits.notFound({
        message: `Could not find the role has id ${inputs.roleId}`,
      })
    }

    const accountRecord = await Account.create({
      userCode: inputs.userCode,
      password: inputs.password,
      email: inputs.email,
      joiningDate: inputs.joiningDate,
      officialDate: inputs.officialDate,
      contactType: inputs.contactType,
      position: inputs.position,
      idCard: inputs.idCard,
      roleId: inputs.roleId,
    })
    .intercept('E_UNIQUE', (err) => { 
      return exits.badRequest(err);
    })
    .intercept('E_INVALID_NEW_RECORD', (err) => {
      return exits.error(err);
    })
    .fetch();

    if(!accountRecord) {
      return exits.error({
        message: 'It had problem when created a new account',
      });
    };

    const account_id = accountRecord.id;
    const profileRecord = await Profile.create({
      accountId: account_id,
    }).fetch();

    if(!profileRecord) {
      return exits.error({
        message: `It had problem when created a new user's profile`,
      });
    }

    return exits.success({
      account: accountRecord,
      profile: profileRecord
    });
  }
};