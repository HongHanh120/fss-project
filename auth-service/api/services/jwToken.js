/**
 * jwToken
 * 
 * @module : Service
 * @description: JSON Web Token Service for sails
 */

const jwt = require('jsonwebtoken');

module.exports = {
    // Generates a token from supplied payload 
    generateToken: function(payload) {
        return jwt.sign(payload, sails.config.secret,
            {
                expiresIn: 60*60*24 // Token Expire time
            }
        );
    },
    
    // Verifies token on a request
    verifyToken: function(token, callback) {
        return jwt.verify(
            token,                  // The token to be verified
            sails.config.secret,    // Secret key to sign
            callback                // Pass errors or decode token to callback
        );
    },

    getDataFromToken: function(token, callback) {
        let payload;
        jwToken.verifyToken(token, function(err) {
            if (err) {
                return callback(err);
            }
            payload = jwt.decode(token, sails.config.secret);
        });
        return payload;
    }
}