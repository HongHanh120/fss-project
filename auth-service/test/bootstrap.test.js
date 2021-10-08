var sails = require('sails');
var async = require('async');
const Barrels = require('barrels');
const request = require('request');

const barrels = new Barrels(process.cwd()+'/test/fixtures');
const fixtures = barrels.data;
const roles = fixtures.role;
const admin = fixtures.account.admin;

const RESET_TABLES = 'TRUNCATE role RESTART IDENTITY CASCADE';
const QUERY = 'SELECT * FROM role';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Before running any tests...
before( async function() {
    this.timeout(20000);
    // Set enviroment to test
    process.env.NODE_ENV = 'test';

    sails.lift({
            hooks: { grunt: false },
        }, 
        await timeout(10000), 
        async function(err, server) {
            if(err) return err;
            return server;
        }
    ); 
});

// afterEach(function(done) {
//     Destroy all the models in lifecycle.test.js

//     destroyFuncs = [];
//     for (modelName in sails.models) {
//         destroyFuncs.push(function(callback) {
//             sails.models[modelName].destroy({})
//             .exec(function(err) {
//                 callback(null, err)
//             })
//         })
//     }
//     async.parallel(destroyFuncs, function(err, results) {
//         done(err);
//     })
// });

// After all tests have finished..
after( async () =>  {
    sails.lower();
});
