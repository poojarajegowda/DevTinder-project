const express = require("express")
const { userAuth } = require("../middleware/auth")
const ConnectionRequests = require("../models/connectionRequests")
const User = require("../models/user")
const userRouter = express.Router()

userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
    try{
    const loggedInUser = req.user

    const connectionRequest = await ConnectionRequests.find({
        toUserID: loggedInUser._id,
        status: "interested"
    }).populate("fromUserID",["firstName","lastName","photoURL","age","gender","about"],
    )
    res.json({
        message: loggedInUser.firstName + "pending requests",
        data: connectionRequest
    })

  }catch(err){
    res.status(400).send("ERROR: " + err.message)
  }
})

userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequests.find({
            $or:[
            {toUserID: loggedInUser._id,status: "accepted"},
            {fromUserID: loggedInUser._id,status: "accepted"}
            ]
        }).populate("fromUserID",["firstName","lastName","photoURL","age","gender","about"])
        .populate("toUserID",["firstName","lastName","photoURL","age","gender","about"])

       const data = connectionRequests.map((row)=>{
        if(row.fromUserID._id.toString()===loggedInUser._id.toString()){
            return row.toUserID
        }
        return row.fromUserID
    })

    res.json({
       message : loggedInUser.firstName + "Connections",
       data
    })

    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

userRouter.get("/user/feed", userAuth, async(req,res)=>{
    try{

const page = parseInt(req.query.page) || 1
let limit = parseInt(req.query.limit) || 10
limit = limit>50 ? 50 : limit
const skip = (page-1)*limit

const loggedInUser = req.user

const connectionRequest = await ConnectionRequests.find({
    $or:[
        {fromUserID: loggedInUser._id},
        {toUserID: loggedInUser._id}
    ]
}).select("fromUserID toUserID")

        const hideConnectionsFromFeed = new Set();
        connectionRequest.forEach((request)=>{
            hideConnectionsFromFeed.add(request.fromUserID._id)
            hideConnectionsFromFeed.add(request.toUserID._id)
        })

        const feed = await User.find({
            $and: [
           {_id: {$nin : Array.from(hideConnectionsFromFeed)}},
            {_id: {$ne: loggedInUser._id}}
            ]
        }).select("firstName lastName photoURL age gender about")
        .skip(skip)
        .limit(limit)

res.send(feed)

    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = userRouter