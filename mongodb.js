//CRUD create read update delete
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017' 
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());

///Users/WisdomOfKOTL/mongodb/bin/mongod --dbpath=/Users/WisdomOfKOTL/mongodb-data


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5e2e393ac5e1bc2c6414fe35")
    // }, {
    //     $inc: {
    //         age: -8
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) =>{
    //     console.log(result)
    // }).catch((e) => {
    //     console.log(e) 
    // })

    // db.collection('users').deleteMany({
    //     age:55
    // }).then((result) => {
    //     console.log(result);
    // }).catch((e) =>{
    //     console.log(e)
    // })

    db.collection('tasks').deleteOne({
        description: 'Watch Genesis 7.'
    }).then((result) => {
        console.log(result)
        
    }).catch((e) => {
        console.log(e);
        
    })

})



// db.collection('users').findOne({_id: new ObjectID("5e42069549b0640908a4bcab")}, (error, user) => {
    //     if (error) {
    //         return console.log('undable to find user');
    //     }

    //     console.log(user);
    // })

    // db.collection('users').find({age: 23} ).toArray((error, users) => {
    //     console.log(users);
        
    // })
    // db.collection('users').find({age: 23} ).count((error, count) => {
    //     console.log(count);
        
    // })
    
    // db.collection('tasks').findOne({_id: new ObjectID("5e2e3de62787ce2dfcb1b000")}, (error, task) => {
    //     console.log(task);
        
    // })
    // db.collection('tasks').find({completed: false} ).toArray((error, tasks) => {
    //     console.log(tasks);
        
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Watch Genesis 7.',
    //         completed: true
    //     }, {
    //         description: 'Complete node course.',
    //         completed: false
    //     }, {
    //         description: 'Play Dota today.',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('unable to insert doc')
    //     }

    //     console.log(result.ops)
    // })