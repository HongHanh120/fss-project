/**
 * isAuthorized
 * 
 * @module : Policy
 * @description : Simple policy to require an authenticated user.
 *                Looks for an Authorization header bearing a valid JWT token
 */

const jwToken = require("../services/jwToken");

module.exports = function (req, res, next) {
    let token;
    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        // sails.log(parts);
        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if(/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.unauthorized({
                errorCode: 'UNAUTHORIZED',
                message: 'Format is Authorization: Bearer [token].' 
            });
        }
    } else {
        return res.unauthorized({
            errorCode: 'UNAUTHORIZED',
            message: 'No Authorization header was found.'
        });
    };
    
    const payload = jwToken.getDataFromToken(token, function(err) {
        if(err) {
            return res.unauthorized({
                errorCode: 'UNAUTHORIZED',
                message: 'Please logout and login again.'
            }) 
        }
    });

    if (payload) {
        req.userId = payload.userId;
        req.roleId = payload.roleId;
        
        next();
    }
}