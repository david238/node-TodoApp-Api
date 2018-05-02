const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

//mongoose connection
var {mongoose} = require('./db/mongoose');

//import models
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {Resume} = require('./models/resume');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc)=>{
  res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });

});
//
// app.get('/todos/:id', authenticate, (req, res) => {
//   var id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   Todo.findOne({
//     _id: id,
//     _creator: req.user._id
//   }).then((todo) => {
//     if (!todo) {
//       return res.status(404).send();
//     }
//
//     res.send({todo});
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });
//
// app.delete('/todos/:id', authenticate, (req, res) => {
//   var id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   Todo.findOneAndRemove({
//     _id: id,
//     _creator: req.user._id
//   }).then((todo) => {
//     if (!todo) {
//       return res.status(404).send();
//     }
//
//     res.send({todo});
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });
//
// app.patch('/todos/:id', authenticate, (req, res) => {
//   var id = req.params.id;
//   var body = _.pick(req.body, ['text', 'completed']);
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   if (_.isBoolean(body.completed) && body.completed) {
//     body.completedAt = new Date().getTime();
//   } else {
//     body.completed = false;
//     body.completedAt = null;
//   }
// });
//

app.get('/todos', authenticate, (req, res) => {
  Todo.find({_creator:req.user._id}).then((todos) => {
      res.send({todos});
  }, (err) => {
      res.status(400).send(err);
  });
});

// app.post('/resume', (req, res) => {
//   var resume = new Resume({
//     Name: req.body.name,
//     Address: req.body.address,
//     PostalCode: req.body.postalcode,
//     Country: req.body.country,
//     Mobile: req.body.mobile,
//     Email: req.body.email,
//     Linkedin: req.body.linkedin,
//     Github: req.body.github,
//     Languages: req.body.languages,
//     Summary: req.body.summary,
//     Skills: req.body.skills,
//     Employment: req.body.employment,
//     Education: req.body.education,
//     Certificates: req.body.certificates,
//     Extracurriculum: req.body.extracurriculum
//   });
//   resume.save().then((docs) => {
//   res.send(docs);
// }, (err) => {
//     res.status(400).send(err);
//   });
//
// });


app.get('/resume', (req, res) => {
  Resume.find().then((docs) => {
      res.send({docs});
  }, (err) => {
      res.status(400).send(err);
  });
});


//POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

app.get('/users/me', authenticate, (req,res) => {
  res.send(req.user);
});


// POST /users/login {email, password}
app.post('/users/login', (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token)=>{
        res.header('x-auth', token).send(user);
      });
  }).catch((e) => {
    res.status(400).send();
  });

});


app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(()=>{
      res.status(200).send();
  }, ()=>{
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};

//Resume
//Summary
//skills
//Employer history { company, role, duties}
//education { year, title}
//certificates { year, desc }
//referees { name, email, company, title, website}
