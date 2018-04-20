var express = require('express');
var bodyParser = require('body-parser');

//mongoose connection
var {mongoose} = require('./db/mongoose');

//import models
var {Todo} = require('./models/todo');
var {User} = require('./models/User');
var {ResumeModel} = require('./models/Resume');

var app = express();

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

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};

//Resume
//Summary
//skills
//Employer history { company, role, duties}
//education { year, title}
//certificates { year, desc }
//referees { name, email, company, title, website}
