/** 
 * 403 (Forbidden) Handler
 * 
 * Usage
 * return res.forbidden();
 * return res.forbidden(err);
 */

module.exports = function (err, message) {
    // Get access to 'req', 'res', 'sails'
    const req = this.req;
    const res = this.res;
    const sails = req._sails;

    // Set status code
    const statusCode = 403;

    if (err !== undefined) {
        sails.log.verbose('res.forbidden() :: Sending 403 ("Forbidden") response: \n', err);
    } else sails.log.verbose('res.forbidden() :: Sending 403 ("Forbidden") response');

    // Only include errors in response if application enviroment
    // is not set to 'production'. In produciton, we shouldn't 
    // send back any identifying information about errors.
    if (sails.config.enviroment === 'production') {
        err = undefined
    }
    return res.json({
        statusCode: statusCode,
        errorCode: err.code || 'ACCESS_DENIED',
        message: err.message || message,
    });
}