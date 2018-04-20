var mongoose = require('mongoose');

var ResumeModel = mongoose.model('Resume', {
  Summary: {
    type: String
  },
  Skills: {
    type: Array
  }
});

module.exports = {ResumeModel};
