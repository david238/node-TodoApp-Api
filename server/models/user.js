var mongoose = require('mongoose');

//USER
//email - require/trim/type: string/set min length of 1.
var User = mongoose.model('User', {
email: {
  type: String,
  required: true,
  trim: true,
  minlength: 1
}
});

module.exports = {User};
