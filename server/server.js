var express = require('express');
var bodyParser = require('body-parser');

//mongoose connection
var {mongoose} = require('./db/mongoose');

//import models
var {Todo} = require('./models/todo');
//var {User} = require('./models/user');
var {Resume} = require('./models/resume');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
  res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });

});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
      res.send({todos});
  }, (err) => {
      res.status(400).send(err);
  });
});

app.post('/resume', (req, res) => {
  var resume = new Resume({
    Name: req.body.name,
    Address: req.body.address,
    PostalCode: req.body.postalcode,
    Country: req.body.country,
    Mobile: req.body.mobile,
    Email: req.body.email,
    Linkedin: req.body.linkedin,
    Github: req.body.github,
    Languages: req.body.languages,
    Summary: req.body.summary,
    Skills: req.body.skills,
    Employment: req.body.employment,
    Education: req.body.education,
    Certificates: req.body.certificates,
    Extracurriculum: req.body.extracurriculum
  });
  resume.save().then((docs) => {
  res.send(docs);
}, (err) => {
    res.status(400).send(err);
  });

});


app.get('/resume', (req, res) => {
  Resume.find().then((docs) => {
      res.send({docs});
  }, (err) => {
      res.status(400).send(err);
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
