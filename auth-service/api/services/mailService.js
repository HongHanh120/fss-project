module.exports = {
    resetPassword: async function(otp, email) {
        sails.hooks.email.send (
            "email",
            {
                otp: otp,
            },
            {
                to: email,
                subject: 'Reset your password',
            },
            function(err) {
                if(err){
                    console.log(err.message);
                }
                console.log('It worked!');
            }
        )
    }
}