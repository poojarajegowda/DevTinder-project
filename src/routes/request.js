const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require("../middleware/auth")
const ConnectionRequest = require("../models/connectionRequests")
const User = require("../models/user")

requestRouter.post("/request/send/:status/:toUserID", userAuth, async(req,res)=>{
    const fromUserID = req.user._id
    const toUserID = req.params.toUserID
    const status = req.params.status
    try{

        const allowed_status = ["interested", "ignored"]
        if(!allowed_status.includes(status)){
            throw new Error("This is not a valid status")
        }

        const toUser = await User.findById(toUserID)
        if(!toUser){
            throw new Error("User does not exists")
        }

          // checking if there is already a existing connection request 

          const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
               {fromUserID,toUserID},
               {fromUserID: toUserID, toUserID: fromUserID}
            ]
          })

          if(existingConnectionRequest){
            throw new Error("Connection request already exists!!!!!")
          }

        const connectionRequest = new ConnectionRequest({
          fromUserID,toUserID,status
        })
        const data = await connectionRequest.save();
       res.json({
        message: req.user.firstName + status + toUser.firstName,
         data
       })
    } catch(err){
         res.status(400).send("ERROR: "+ err.message)
    }

})

requestRouter.post("/request/review/:status/:requestID", userAuth, async(req,res)=>{

    const status= req.params.status
    const requestID = req.params.requestID
      try{

        const loggedInUser = req.user

        const ALLOWED_DATA = ["accepted", "rejected"]
        if(!ALLOWED_DATA.includes(status)){
            throw new Error("Status cannot be taken!!")
        }
     
        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestID,
            toUserID:loggedInUser._id,
            status:"interested"
        })

        if(!connectionRequest){
            throw new Error("Request cannot be found")
        }
         connectionRequest.status = status
        await connectionRequest.save();
        res.json({
            message: loggedInUser.firstName + status + "request",
        })


      }catch(err){
        res.status(400).send("ERROR: " + err.message)
      }
})

module.exports = {
    requestRouter
}