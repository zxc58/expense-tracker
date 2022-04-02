//
const mongoose =require("mongoose")
const mongodbUri=process.env.MONGODB_URI
const db=mongoose.connection
//
mongoose.connect(mongodbUri)
db.on("error",()=>console.log("db connect error"))
db.once("open",()=>console.log("db connect success"))
//
module.exports=db