const nestedPop = require('nested-pop');

module.exports = {


  friendlyName: 'Search CV by tagname',


  description: 'Search CV by the tagname.',


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

    badRequest: {
      responseType: 'badRequest',
    }
  },


  fn: async function (inputs, exits) {

    try {
      let tagname = this.req.query.tagname;

      const tagnames = await Tagname.find({
        tagname: {
          'contains': tagname
        }
      });

      if(tagnames.length <= 0) {
        return this.res.redirect('http://localhost:3000/api/v1/cv');
      }

      let CVs = []; 
      for (let ele of tagnames) {
        let cvs = [];
        cvs = await CvTagname.find({
          tagname: ele.id
        });
        
        for(let cv of cvs) {
          CVs.push(cv);
        }
      };

      const obj = {};
      let uniqueCV = [];
      for (const ele of CVs) {
        if (!(ele.cv in obj)) {
          uniqueCV.push(ele);
          obj[ele.cv] = true;
        };
      };

      let result = [];
      for(let ele of uniqueCV) {
        let cv = '';
        cv = await Cv.findOne({id: ele.cv})
        .populate('experiences')
        .populate('programingLanguages');

        result.push(cv);
      }
      
      return exits.success(result);
    } catch(err) {
      return exits.error(err, err.message);
    }
  } 
};
