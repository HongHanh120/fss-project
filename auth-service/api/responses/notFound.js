/** 
 * 404 (Not Found) Handler
 * 
 * Usage
 * return res.notFound();
 * return res.notFound(err);
 */

 module.exports = function (err, message) {
    // Get access to 'req', 'res', 'sails'
    const req = this.req;
    const res = this.res;
    const sails = req._sails;

    // Set status code
    const statusCode = 404;

    if (err !== undefined) {
        sails.log.verbose('res.notFound() :: Sending 404 ("Not Found") response: \n', err);
    } else sails.log.verbose('res.notFound() :: Sending 404 ("Not Found") response');

    // Only include errors in response if application enviroment
    // is not set to 'production'. In produciton, we shouldn't 
    // send back any identifying information about errors.
    if (sails.config.enviroment === 'production') {
        err = undefined
    }
    return res.json({
        statusCode: statusCode,
        message: message || "Not Found",
        error: err
    });
}