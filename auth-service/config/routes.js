/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  'POST /api/v1/auth/login': {action: 'auth/login'},
  'POST /api/v1/auth/reset/password': {action: 'auth/reset-password'},
  'GET /api/v1/auth/check/token': {action: 'auth/check-token'},
  'PUT /api/v1/auth/change/password': {action: 'auth/change-password'},
  'DELETE /api/v1/auth/logout': {action: 'auth/logout'},
  
  'POST /api/v1/account/create': { action: 'account/create'},
  'GET /api/v1/account': {action: 'account/index'},
  'GET /api/v1/account/display': {action: 'account/display'},
  'GET /api/v1/account/get/infor': {action: 'account/get-infor'},
  'PUT /api/v1/account/update/:accountId': {action: 'account/update'},
  'DELETE /api/v1/account/delete/:accountId': {action: 'account/delete'},

  'GET /api/v1/profile/display': {action: 'profile/display-infor'},
  'PUT /api/v1/profile/update': {action: 'profile/update-infor'},

  'POST /api/v1/role/create': { action: 'role/create'},
  'GET /api/v1/role': {action: 'role/index'},
  'DELETE /api/v1/role/delete/:roleId': {action: 'role/delete'},

  'GET /api/v1/auth/facebook': 'passport/FacebookController.facebookAuth',
  'GET /api/v1/auth/facebook/callback': 'passport/FacebookController.facebookCallback',

  'GET /api/message/publish': { action: 'messageBroker/sender' },
  'GET /api/message/consume': { action: 'messageBroker/receiver' },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
