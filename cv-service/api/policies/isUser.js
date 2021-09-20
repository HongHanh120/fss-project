/**
 * isUser
 * 
 * @module : Policy
 * @description : Simple policy to require an authenticated user is User.
 *               
 */

 module.exports = function (req, res, next) {
     sails.log(req.roleId);
     if (!req.roleId || req.roleId !== 2) {
         return res.forbidden({
             errorCode: 'ACCESS_DENIED',
             message: 'Access denied'
         });
     } else {
        next();
     }
 }