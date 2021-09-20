/** 
 * 200 (OK) Response
 * 
 * Usage
 * return res.ok();
 * return res.ok(data);
 */

module.exports = function (data, message) {
    // Get access to 'req', 'res', 'sails'
    const req = this.req;
    const res = this.res;
    const sails = req._sails;

    sails.log.silly('res.ok() :: Sending 200 ("OK") response');

    // Set status code
    const statusCode = 200;

    return res.json({
        statusCode: statusCode,
        message: message || "OK",
        data: data || {}
    });
}