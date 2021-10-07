var sails = require('sails');
var async = require('async');
const Barrels = require('barrels');
const request = require('request');

const barrels = new Barrels(process.cwd()+'/test/fixtures');
const fixtures = barrels.data;
const RESET_TABLES = 'TRUNCATE role RESTART IDENTITY CASCADE';

// Before running any tests...
before(function(done) {
    // Increase timeout so that Sails has enough time to lift.
    this.timeout(50000);

    process.env.NODE_ENV = 'test';

    sails.lift({
        // Your Sails app's configuration files will be loaded automaticailly,
        // but you can also specify any other special overrides here for testing purposes.
        hooks: { grunt: false },
    }, function(err, server) {
        if(err) done(err);
        else {

        // here you can load fixtures
        // for example, you might want to create some records ins the database;
        
        // Truncate role table with restarting identity
            Role.getDatastore().sendNativeQuery(RESET_TABLES).exec(function(error) {
                if (error) {
                    console.log(error.message);
                    return done(error);
                };
                console.log('Truncated all tables');
            });

            // Create admin and user role
            const roles = fixtures.role;
            for (let role of roles) {
                Role.create({ roleName: role.role_name })
                    .fetch()
                    .then(function(role) {
                        console.log(`Role ${role.roleName} created successfully`);
                    })
                    .catch(function(error) {
                        console.log(error.messgae);
                        return done(error);
                    })
            };
            return done();
        }
    }); 
});

afterEach(function(done) {
    // Destroy all the models in lifecycle.test.js
    destroyFuncs = [];
    for (modelName in sails.models) {
        destroyFuncs.push(function(callback) {
            sails.models[modelName].destroy({})
            .exec(function(err) {
                callback(null, err)
            })
        })
    }
    async.parallel(destroyFuncs, function(err, results) {
        done(err);
    })
});

// After all tests have finished..
after(function(done) {
    sails.lower(done);
});