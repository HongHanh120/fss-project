/**
 * Cv.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    location: {
      type: 'string',
    },

    skill: {
      type: 'string',
    },

    product: {
      type: 'string',
    },

    linkImg: {
      type: 'string',
      columnName: 'link_img'
    },

    viewCount: {
      type: 'number',
      defaultsTo: 0,
      columnName: 'view_count'
    },

    accountId: {
      type: 'number',
      columnName: 'account_id',
      required: true,
      unique: true,
      allowNull: false,
    },

    roleId: {
      type: 'number',
      columnName: 'role_id',
      required: true,
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

    experiences: {
      collection: 'experience',
      via: 'cvId'
    },

    programingLanguages: {
      collection: 'programinglanguage',
      via: 'cvId',
    },

    tagnames: {
      collection: 'tagname',
      via: 'cv',
      through: 'cvtagname',
    }
  },

  customToJSON: function() {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

