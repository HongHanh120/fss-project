/**
 * isAdmin
 * 
 * @module : Policy
 * @description : Simple policy to require an authenticated user is Admin.
 *               
 */

 module.exports = function (req, res, next) {
    //  sails.log(req.roleId);
     if (!req.roleId || req.roleId !== 1) {
         return res.forbidden({
             errorCode: 'ACCESS_DENIED',
             message: 'Access denied'
         });
     } else {
        next();
     }
 }