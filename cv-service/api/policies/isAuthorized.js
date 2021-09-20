/**
 * isAdmin
 * 
 * @module : Policy
 * @description : Simple policy to require an authenticated user is Admin.
 *               
 */
const request = require('request');

 module.exports = async function (req, res, next) {
    authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.unauthorized({
            message: 'Please login before access this action.'
        })
    } else {
        const options = {
            url: 'http://localhost:1337/api/v1/auth/check/token',
            headers: {
                'Authorization': authHeader,
            }
        }
    
        await request.get(options, function(err, httpResponse, body){
            if (err) {
                return httpResponse.badResquest(err);
            } else {
                const data = JSON.parse(body);
                if (data.statusCode === 200) {
                    req.userId = data.data.accountId;
                    req.roleId = data.data.roleId;
                    next();
                } else {
                    return res.forbbiden({
                        errorCode: 'ACCESS_DENIED',
                        message: 'Access denied'
                    });
                }
            }
        });
    }
 }