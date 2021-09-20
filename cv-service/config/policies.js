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
  'cv/*': ['isAuthorized', 'isUser'],
  'cv/get': 'isAuthorized',
  'cv/index': ['isAuthorized', 'isAdmin'],
  'cv/most-view': ['isAuthorized', 'isAdmin'],
  'cv/download': 'isAuthorized',
  'cv/delete': 'isAuthorized',

  'tagname/*': ['isAuthorized', 'isAdmin'],
  'tagname/index': 'isAuthorized',

  'cv-tagname/*': ['isAuthorized', 'isUser'],
};
