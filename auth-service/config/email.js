const local = require('./local');

module.exports.email = {
    service: 'SendGrid',

    auth: {
        user: local.mail_user,
        pass: local.mail_pass,
    },

    from: 'kazehanh@gmail.com',

    testMode: false,

    ssl: false,
}