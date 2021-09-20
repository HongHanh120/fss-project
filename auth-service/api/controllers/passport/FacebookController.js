/**
 * FacebookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
  facebookAuth: function(req, res, next) {
      passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
  },

  facebookCallback: function(req, res, next) {
      passport.authenticate('facebook', function(err, user) {
        sails.log('facebook credentials');
        sails.log(user);
        res.json(user);
      })(req, res, next);
  },
};

