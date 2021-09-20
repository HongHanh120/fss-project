'use strict'

const local = require('../local');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const request = require('request');

const verifyHandler = function(req, token, tokenSecret, profile, done) {
    const url = 'https://graph.facebook.com/v2.10/me?access_token=%s&fields=id,emails,first_name,last_name,photos';
    url = url.replace('%s', token);

    const options = {
        method: 'GET',
        url: url,
        json: true,
    };

    request(options, function(err, response) {
        if (err) {
            return done(null, null);
        };

        const data = {
            id: response.body.id,
            name: response.body.first_name + " " +
                    response.body.last_name,
            email: response.body.email,
            photo: response.body.picture.data.url,
        };

        sails.log(data);

        return done(null, data);
    });
};

passport.use(new FacebookStrategy({
    clientID: local.client_id,
    clientSecret: local.client_secret,
    callbackURL: local.callback_url,
    passReqToCallback: true
}, verifyHandler));
