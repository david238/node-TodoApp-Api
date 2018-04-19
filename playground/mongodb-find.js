const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
if (err) {
  return console.log('unable to connect to MongoDB server');
}
console.log('Connected to MongoDB server');

//FIND METHOD
// db.collection('Todos').find({
//   _id: new ObjectID('5ad90a4b4c6e750943356d4b')
// }).toArray().then((docs) => {
// console.log('Todos');
// console.log(JSON.stringify(docs, undefined, 2));
// }, (err) => {
//   console.log('Unable to fetch todos', err);
// });

//COUNT METHOD, for more methods check mongodb.github.io/node-mongodb-native/
db.collection('Todos').find().count().then((count) => {
console.log(`Todos count: ${count}`);
}, (err) => {
  console.log('Unable to fetch todos', err);
});

//db.close();
});
