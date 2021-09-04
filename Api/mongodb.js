// npm init -y
// npm i mongodb

const mongodb = require('mongodb')

// Intalize connection --> give us functions necessary to connect to Db 
// so that we can preform CRUD Operations

const mongoClient = mongodb.MongoClient

// Define connection url 
const connectionUrl = 'mongodb://127.0.0.1:27017'

// Db name

const dbName = 'task-manger'

// useNewUrlParser --> provide better connection to db
mongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Error has occurred')
    }
    console.log('Success')
    const db = client.db(dbName)

    // collection tasks
    // {description:'task1',completed:}
    // db.collection('users').insertOne(
    //     {name:'Omar',age:30}
    // )

    // db.collection('users').insertMany(
    //     [
    //         {name:'Ismail',age:40},
    //         {name:'Osama',age:20},
    //         {name:'Amira',age:20},
    //         {name:'Salma',age:20},
    //     ]
    // )

    ///////////////////////////////////////////////////////////////////////////////////

// Find

const ObjectID = mongodb.ObjectId

// find one --> one document
// db.collection('users').findOne({_id:new ObjectID('611a4effd8d5d65cb6bd730c')},(error,user)=>{
//     if(error){
//         console.log('Error has occurred')
//     }
//     console.log(user)
// })

// multiple documents
// find return pointer 
// toArray --> array of documents

// db.collection('users').find({age:50}).toArray((error,users)=>{
//     if(error){
//         console.log('Error has occurred')
//     }
//     console.log(users)
// })

// count --> number of documents
// db.collection('users').find({age:20}).count((error,users)=>{
//     if(error){
//         console.log('error has occurred')
//     }
//     console.log(users)
// })

// limit --> limit number of documents fetched
// db.collection('users').find({age:20}).limit(2).toArray((error,users)=>{
//     if(error){
//         console.log('Error has occurred')
//     }
//     console.log(users)
// })
///////////////////////////////////////////////////////////////////////////////////////

// Update

// db.collection('users').updateOne({_id:new ObjectID('611a4effd8d5d65cb6bd730c')},
// {
//  $set:{name:'Omar',age:20},
// //  $inc:{age:5}
// }).then((result)=>{
//     console.log(result.modifiedCount)
// }).catch((error)=>{
//     console.log(error)
// })

// db.collection('users').updateMany({},{
//     $set:{age:30}
// }).then((result)=>{
//     console.log(result.modifiedCount)
// }).catch((error)=>{
//     console.log(error)
// })
//////////////////////////////////////////////////////////////////////////////////

// Delete 

db.collection('users').deleteOne({_id:new ObjectID('611a4effd8d5d65cb6bd730d')})
.then((result)=>{
    console.log(result.deletedCount)
}).catch((error)=>{
    console.log(error)
})

db.collection('users').deleteMany({})
.then((result)=>{
    console.log(result.deletedCount)
}).catch((error)=>{
    console.log(error)
})
})

