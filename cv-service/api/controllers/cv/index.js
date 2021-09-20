module.exports = {


  friendlyName: 'Get all CV',


  description: 'Get all CV.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'ok',
    },
    
    error: {
      responseType: 'serverError',
    },

    notFound: {
      responseType: 'notFound',
    },

    forbidden: {
      responseType: 'forbidden',
    },
  },


  fn: async function (inputs, exits) {
    try {
      
      // Check existed admin
      const checkUser = await sails.helpers.getInforUser.with({
        accountId: this.req.userId,
        authHeader: this.req.headers.authorization,
      });

      if(!checkUser) {
        return exits.notFound({
          errorCode: 'NOT_FOUND',
          message: `Could not find the user who has id ${this.req.userId}`,
        })
      };

      // Get all user
      const allUser = await sails.helpers.getAllUser.with({
        authHeader: this.req.headers.authorization,
      });

      const allCV = await Cv.find().populate('programingLanguages');
      if(allCV.length <= 0) {
        return exits.notFound({
          message: 'There has no CV to display.'
        });
      };

      let userCV = [];
      for(let cv of allCV) {
        const ele = {
          cvId: '',
          userId: '',
          email: '',
          location: '',
          skill: '',
          programingLanguage: '',
        }
        for (let user of allUser) {
          if (user.id === cv.accountId) {
            ele.cvId = cv.id;
            ele.userId = user.id;
            ele.email = user.email;
            ele.location = cv.location;
            ele.skill = cv.skill;
            ele.programingLanguage = cv.programingLanguages;

            userCV.push(ele);
          }
        }
      }

      return exits.success(userCV);

    } catch (err) {
      return exits.error(err, err.message);
    }
  }


};
