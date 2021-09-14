/** 
 * 401 (Unauthorized) Handler
 * 
 * Usage
 * return res.unauthorized();
 * return res.unauthorized(err);
 * 
 * e.g.:
 * 
 * return res.unauthorized(
 *  'Missing or bad authentication'
 * );
 */

 module.exports = function (err, message) {
    // Get access to 'req', 'res', 'sails'
    const req = this.req;
    const res = this.res;
    const sails = req._sails;

    // Set status code
    const statusCode = 401;

    if (err !== undefined) {
        sails.log.verbose('res.unauthorized() :: Sending 401 ("Unauthorized") response: \n', err);
    } else sails.log.verbose('res.unauthorized() :: Sending 401 ("Unauthorized") response');

    // Only include errors in response if application enviroment
    // is not set to 'production'. In produciton, we shouldn't 
    // send back any identifying information about errors.
    if (sails.config.enviroment === 'production') {
        err = undefined
    }
    return res.json({
        statusCode: statusCode,
        message: message || "Unauthorized",
        error: err
    });
}