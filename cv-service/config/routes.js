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
  // CV
  'POST /api/v1/cv/create': {action: 'cv/create'},
  'GET /api/v1/cv/display/:id': {action: 'cv/get'},
  'GET /api/v1/cv': {action: 'cv/index'},
  'GET /api/v1/cv/most/view': {action: 'cv/most-view'},
  'GET /api/v1/cv/download/:id': {action: 'cv/download'},
  'PUT /api/v1/cv/update': {action: 'cv/update'},
  // 'DELETE /api/v1/cv/delete/:id': {action: 'cv/delete'}, 

  // Experience
  'POST /api/v1/cv/experience/create': {action: 'cv/experience/create'},
  'PUT /api/v1/cv/experience/update/:id': {action: 'cv/experience/update'},
  'DELETE /api/v1/cv/experience/delete/:id': {action: 'cv/experience/delete'},

  // Programing language
  'POST /api/v1/cv/programinglanguage/create': {action: 'cv/programinglanguage/create'},
  'PUT /api/v1/cv/programinglanguage/update/:id': {action: 'cv/programinglanguage/update'},
  'DELETE /api/v1/cv/programinglanguage/delete/:id': {action: 'cv/programinglanguage/delete'},

  // Tagname
  'POST /api/v1/tagname/create': {action: 'tagname/create'},
  'GET /api/v1/tagname': {action: 'tagname/index'},
  'PUT /api/v1/tagname/update/:id': {action: 'tagname/update'},
  'DELETE /api/v1/tagname/delete/:id': {action: 'tagname/delete'},

  // CV - Tagname 
  'POST /api/v1/cvtagname/create': {action: 'cv-tagname/create'},

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
