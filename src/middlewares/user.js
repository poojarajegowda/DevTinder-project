const express= require("express")

const app= express()

const userAuth=app.use("/user",(req,res,next)=>{
const token="abcbnm"
const isTokenValid=token==="abc"
if(!isTokenValid){
    res.send("token is incorrect")
}
else{
    next();
}
})

module.exports={userAuth}