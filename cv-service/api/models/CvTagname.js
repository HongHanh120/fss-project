/**
 * CvTagname.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cv: {
      model: 'cv',
      columnName: 'cv_id',
    },

    tagname: {
      model: 'tagname',
      columnName: 'tagname_id',
    },

    createdAt: false,

    updatedAt: false,
  },

  tableName: 'cv_tagname',

  customToJSON: function() {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },
};

