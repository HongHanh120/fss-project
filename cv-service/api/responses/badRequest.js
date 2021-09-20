/** 
 * 400 (Bad Request) Handler
 * 
 * Usage
 * return res.badRequest();
 * return res.badRequest(err);
 * 
 * e.g.:
 * 
 * return res.badRequest(
 *  'Please choose a valid `password` (6-12 characters)'
 * );
 */

 module.exports = function (err, code, message) {
    // Get access to 'req', 'res', 'sails'
    const req = this.req;
    const res = this.res;
    const sails = req._sails;

    // Set status code
    const statusCode = 400;

    if (err !== undefined) {
        sails.log.verbose('res.badRequest() :: Sending 400 ("Bad Request") response: \n', err);
    } else sails.log.verbose('res.badRequest() :: Sending 400 ("Bad Request") response');

    // Only include errors in response if application enviroment
    // is not set to 'production'. In produciton, we shouldn't 
    // send back any identifying information about errors.
    if (sails.config.enviroment === 'production') {
        err = undefined
    }
    return res.json({
        statusCode: statusCode,
        errorCode: err.code || code,
        message: err.message || message
    });
}