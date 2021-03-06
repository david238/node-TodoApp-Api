const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'andrew@example.com',
  password: 'userOnePass',
  tokens:[{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access:'auth'}, 'abc123').toString()
  }]
},{
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens:[{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access:'auth'}, 'abc123').toString()
  }]
}];

const todos = [{
 _id: new ObjectID(),
 text: 'First Test todo',
 _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateUsers = (done) => {
  User.remove({}).then(()=> {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]).then(() => done());
  });
};

//testing lifecycle method
//wipe all our todos in database always before testing the code
const populateTodos = (done) => {
  Todo.remove({}).then(()=> {
    return Todo.insertMany(todos);
  }).then(() => done());
}

module.exports = {todos, populateTodos, users, populateUsers};
