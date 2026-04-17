const express= require("express")

const app= express()

app.use("/test",(req,res)=>{
    res.send("Hello from pooja hello hello hi")
})

app.use("/demo",(req,res)=>{
    res.send("this is a hurrah!!!")
})

app.use("/",(req,res)=>{
    res.send("Goood night yahhhhhhh")
})


app.listen(7777,()=>{
    console.log("Server started successfully on port 7777")
})