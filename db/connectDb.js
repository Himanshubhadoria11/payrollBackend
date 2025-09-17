const mongoose =require('mongoose')
//const url = 'mongodb://127.0.0.1:27017/backendAPI'

const connectDb=()=>{
    //For local Db
    // return mongoose.connect(process.env.LOCAL_URL)
     return mongoose.connect(process.env.MONGO_URI)

    //For cloud Db
    //return mongoose.connect(database)

    .then(()=>{
        console.log("MongoDb Connected Successfully")
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports=connectDb