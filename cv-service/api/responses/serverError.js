/** 
 * 500 (Server Error) Response
 * 
 * Usage
 * return res.serverError();
 * return res.serverError(err);
 * 
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()` automatically.
 */

 module.exports = function (err, message) {
    // Get access to 'req', 'res', 'sails'
    const req = this.req;
    const res = this.res;
    const sails = req._sails;

    // Set status code
    const statusCode = 500;

    if (err !== undefined) {
        sails.log.verbose('res.serverError() :: Sending 500 ("Server Error") response: \n', err);
    } else sails.log.verbose('res.serverError() :: Sending 500 ("Server Error") response');

    // Only include errors in response if application enviroment
    // is not set to 'production'. In produciton, we shouldn't 
    // send back any identifying information about errors.
    if (sails.config.enviroment === 'production') {
        err = undefined
    }
    return res.json({
        statusCode: statusCode,
        errorCode: err.code || 'SERVER_ERROR',
        message: err.message || message,
    });
}