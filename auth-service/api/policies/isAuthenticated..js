/**
 * isAuthenticated
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
        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if(/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.authorizied({
                err: 'Format is Authorization: Bearer [token].' 
            });
        }
    } else {
        return res.authorizied({
            err: 'No Authorization header was found.'
        });
    };

    jwToken.getDataFromToken(token, function(err, data) {
        if(err) {
            return res.authorizied({
                err: 'Please logout and login again.'
            })
        }
        const payload = data;
        req.userId = payload.userId;
        req.roleId = payload.roleId;

        next();
    })
}