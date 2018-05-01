const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate:{
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access: {
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
});

//overwrite return methods, regular function, determine what value are sent
//back when data is converted into a JSON value.
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email','tokens']);
};

//instance method
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then((user) => {
    return token;
  });
};

//turn into a model methods
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

    try{
      decoded = jwt.verify(token, 'abc123');
    } catch(e){
      // return new Promise((resole, reject) => {
      //   reject();
      // });
      return Promise.reject();
    }

    //this return a promise
    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
};


//use of mongoose middleware pre, always use next as parameter, else program will crash
UserSchema.pre('save', function (next) {
  var user = this;

  //takes individual property and return true or false. encrypt password only if modified.
  if (user.isModified('password'))
  {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) =>{
          user.password = hash;
          next();
        });
      });
  }else{
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
