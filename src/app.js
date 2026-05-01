const express= require("express")
const {connectDB}= require("./config/database")
const app= express()
const cookieParser = require("cookie-parser")
const { authRouter } = require("./routes/auth")
const { profileRouter } = require("./routes/profile")
const { requestRouter } = require("./routes/request")
const userRouter = require("./routes/user")
const cors = require("cors")
require("dotenv").config();

app.use(cors({
  origin:"https://dev-tinder-web-plum-delta.vercel.app",
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

connectDB().then(()=>{
console.log("Database connected successfully")
app.listen(process.env.PORT || 7777,()=>{
    console.log(`Server running on port ${process.env.PORT || 7777}`);
})
}).catch((err)=>{
    console.error("Database cannot be connected", err)
})
