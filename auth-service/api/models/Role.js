/**
 * Role.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    createdAt: false,
    updatedAt: false,
    roleName: {
      type: 'string',
      required: true,
      unique: true,
      allowNull: false,
      columnName: 'role_name'
    },
    accounts: {
      collection: 'account',
      via: 'roleId'
    }
  },

};

