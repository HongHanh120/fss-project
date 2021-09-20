/**
 * Profile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    avatar: {
      type: 'string'
    },
    profileName: {
      type: 'string',
      columnName: 'profile_name'
    },
    profilePhone: {
      type: 'string',
      columnName: 'profile_phone'
    },
    profileAddress: {
      type: 'string',
      columnName: 'profile_address'
    },
    sex: {
      type: 'string'
    },
    dateOfBirth: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'date_of_birth'
    },
    accountId: {
      model: 'account',
      unique: true,
      columnName: 'account_id',
    },
    createdAt: false,
    updatedAt:false
  },

};

