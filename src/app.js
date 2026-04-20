const express= require("express")
const {connectDB}= require("./config/database")
const app= express()
const User =require("./models/user")

app.post("/signup",async (req,res)=>{
    const user= new User({
        firstName:"pooja",
        lastName:"rajegowda",
        emailID:"pooja@gmail.com",
        password:"pooja@123"
    })

    try{
   await user.save()
   res.send("User saved successfully")
    }catch(err){
        console.log("Error saving the data",err.message)
    }

})


connectDB().then(()=>{
console.log("Database connected successfully")
app.listen(7777,()=>{
    console.log("Server started successfully on port 7777")
})
}).catch((err)=>{
    console.error("Database cannot be connected")
})
