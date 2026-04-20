const express= require("express")
const {userAuth}=require("./middlewares/user")

const app= express()

app.get("/user/getAccount",userAuth,(req,res)=>{

    res.send("User looged in successfully")
})



app.get("/user/deleteAccount",userAuth,(req,res)=>{

    res.send("User deleted in successfully")
})




app.listen(7777,()=>{
    console.log("Server started successfully on port 7777")
})