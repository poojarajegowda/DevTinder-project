const mongoose = require("mongoose")

const connectDB= async()=>{
await mongoose.connect
("mongodb+srv://poojagowda171003_db_user:NKrgOuo3SgONZz6y@cluster0.bnal7mo.mongodb.net/devTinder?appName=Cluster0")
}

module.exports={connectDB}
