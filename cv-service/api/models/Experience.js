/**
 * Experience.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    oldCompany: {
      type: 'string',
      columnName: 'old_company',
    },

    joinDate: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'join_date'
    },

    outDate: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'out_date'
    },

    cvId: {
      model: 'cv',
      columnName: 'cv_id',
    },

    createdAt: {
      type: 'ref',
      columnType: 'datetime',
      autoCreatedAt: true,
      columnName: 'created_at',
    },

    updatedAt: {
      type: 'ref',
      columnType: 'datetime',
      autoCreatedAt: true,
      columnName: 'updated_at',
    },
  },

  customToJSON: function() {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },
};

