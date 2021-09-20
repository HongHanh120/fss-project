/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
   // '*': true,
  'auth/*': 'isAuthorized',
  'auth/login': true,
  'auth/reset-password': true,

  'account/*': ['isAuthorized', 'isAdmin'],
  'account/display': 'isAuthorized',
  'account/get-infor': 'isAuthorized',

  'profile/*': 'isAuthorized',

  'role/*': ['isAuthorized', 'isAdmin'],
};
