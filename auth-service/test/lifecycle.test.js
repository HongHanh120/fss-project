const Sails = require('sails');

// Before running any tests...
before (function (done) {

    // Increase the Mocha timeout so that Sails has enough time to lift,
    // even if you have a bunch of assets
    this.timeout(5000);

    process.env.NODE_ENV = 'test';
    process.env.PORT = 8000;

    Sails.lift({
        // Your Sails app's configuration files will be loaded automaticailly,
        // but you can also specify any other special overrides here for testing purposes.

        models: {
            connection: 'localDiskDb',
            migrate: 'drop',
        }
    }, function(err, server) {
        sails = server;
        if(err) return done(err);

        sails.log.infor('****** Starting tests... ******');
        console.log('\n');

        // here you can load fixtures
        // for example, you might want to create some records in the database

        done(null, sails);
    });
});

// After all tests have finished...
after(function(done) {

    // here you can clear fixtures 
    // for example, you might want to destroy the records you created above
    sails.lower(done);
})