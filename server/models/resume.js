var mongoose = require('mongoose');

// var history = mongoose.model('history',{
//     period: {
//       type: String
//     },
//     companyname:{
//       type: String
//     },
//     position: {
//       type: String
//     },
//     roles: [{
//         type: String
//     }]
// });

var Resume = mongoose.model('Resume', {
  Name:{
    type: String
  },
  Address:{
    type: String
  },
  PostalCode:{
    type: String
  },
  Country:{
    type: String
  },
  Mobile:{
    type: String
  },
  Email: {
    type: String
  },
  Linkedin:{
    type: String
  },
  Github:{
    type: String
  },
  Languages: [{
    language: String,
    spoken: String,
    writing: String,
    listening: String,
    reading: String
  }],
  Summary: {
    type: String
  },
  Skills: [{
    type: String
  }],
  Employment: [{
    period: String,
    companyname: String,
    position: String,
    roles: [{
      type: String
    }]
  }],
  Education:[{
    year: String,
    title: String
  }],
  Certificates:[{
    year: String,
    description: String
  }],
  Extracurriculum:[{
    period: String,
    description: String
  }]
});

module.exports = {Resume};
