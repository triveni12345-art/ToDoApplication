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
 //User routes
 'POST /users/create':'UserController.create',
 'GET /users':'UserController.find',
 'PUT /users/:id':'UserController.update',
 'DELETE /users/:id':'UserController.delete',
//  //task routes
 'POST /tasks':'TaskController.create',
 'GET /tasks':'TaskController.find',
 'GET /tasks/:id':'TaskController.findOne',
 'PUT /tasks/:id':'TaskController.update',
 'DELETE /tasks/:id':'TaskController.delete',
 //email registration routes
 'POST /user/register': 'user/register',
 'GET /user/confirm': 'user/confirm',
 'POST /user/login': 'user/login',

 //file routes
 'POST /image': 'FileController.uploadImage',
 'GET /image/:id': 'FileController.viewImage',
 'DELETE /image/:id': 'FileController.delete',

 //restaurant routes

 'POST /rest' : 'RestaurantController.create',
 'GET /rest' : 'RestaurantController.find',
 'PUT /rest/:id' : 'RestaurantController.update',
 'DELETE /rest/:id':'RestaurantController.delete',


 //Manage Rest routes
 'POST /resto' : 'ManageRestaurantController.create',
 'GET /resto' : 'ManageRestaurantController.find',
 'PUT /resto/:id' : 'ManageRestaurantController.update',
 'DELETE /resto/:id':'ManageRestaurantController.delete',




 
 




};
