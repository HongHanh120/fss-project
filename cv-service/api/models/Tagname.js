/**
 * Tagname.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tagname: {
      type: 'string',
      required: true,
      unique: true,
    },

    cvs: {
      collection: 'cv',
      via: 'tagname',
      through: 'cvtagname',
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

