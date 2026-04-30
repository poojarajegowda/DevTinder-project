const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserID : {
       type : mongoose.Schema.Types.ObjectId,
       required: true,
       ref: "User"
    },
    toUserID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
     status :{
       type : String,
       enum : {
        values : ["interested", "ignored", "accepted", "rejected"],
        message : "{VALUE} is not a valid status"
       }
     }
},{
    timestamps :true
})


connectionRequestSchema.index({fromUserID :1 , toUserID: 1})

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this

    if(connectionRequest.fromUserID.equals(connectionRequest.toUserID)){
        throw new Error("Connection request cannot be sent to yourself")
    }
    next()
})

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema)