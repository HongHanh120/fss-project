/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    userCode: {
      type: 'string',
      columnName: 'user_code'
    },

    password: {
      type: 'string',
      required: true,
      custom: function(value) {
        // be a string
        // be at least 10 character long
        // contain at least one number
        // contain at least one letter
        return _.isString(value) && value.length >= 10 
              && value.match(/[a-z]/i) && value.match(/[0-9]/);
      }
    },

    email: {
      type: 'string',
      required: true,
      unique: true,
      allowNull: false,
      isEmail: true
    },

    joiningDate: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'joining_date'
    },

    officialDate: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'official_date'
    },

    contactType: {
      type: 'string',
      columnName: 'contact_type'
    },

    position: {
      type: 'string'
    },

    idCard: {
      type: 'string',
      columnName: 'id_card'
    },

    roleId: {
      model: 'role',
      columnName: 'role_id'
    },

    profileId: {
      collection: 'profile',
      via: 'accountId'
    },

    createdAt: false,

    updatedAt: false
  },

  customToJSON: function() {
    return _.omit(this, ['password']);
  },

  beforeCreate: function (account, proceed) {
    bcrypt.genSalt(10, function(err, sail) {
      if (err) {
        console.log(err.message);
        return proceed();
      }

      bcrypt.hash(account.password, sail, function(err, hash){
        if (err) {
          console.log(err.message);
          return proceed();
        } else {
          account.password = hash;
          return proceed();
        }
      });
    });
  },

  beforeUpdate: function(account, proceed) {
    if(account.password) {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          console.log(err);
          return proceed();
        }
        bcrypt.hash(account.password, salt, function(err, hash) {
          if (err) {
            console.log(err);
            return proceed();
          } else {
            account.password = hash;
            return proceed();
          }
        });
      });
    };
  },

  // comparePassword(password, encryptedPassword) {
  //   return Promise(function(resolve, reject) {
  //     bcrypt.compare(password, encryptedPassword, function(err, match) {
  //       if (err) {
  //         console.log(err.message);
  //         return reject("Something went wrong!");
  //       }
        
  //       if(match) {
  //         return resolve();
  //       } else return reject("Mismatch passwords");
  //     });
  //   });
  // }
};

