const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName: {
        type:String,
        minLength:1,
        maxLength:50
    },
    emailID: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
              throw new Error("Enter a valid email")
        }
    },
    password: {
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
                throw new Error("The password should be of minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1")
        }
    },
    age: {
        type:String,
        min:18
    },
    gender: {
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value))
                throw new Error("Enter the valid gender")
        }
    },
    photoURL: {
        type:String,
        default:"https://img.freepik.com/premium-vector/default-avatar-profile-icon-gray-placeholder-vector-illustration_514344-14759.jpg?semt=ais_hybrid&w=740&q=80",
        validate(value){
            if(!validator.isURL(value))
                throw new Error("Enter the valid photoURL")
        }
    },
    skills: {
        type:[String],
        validate(value){
            if(value.length>5){
              throw new Error("Skills cannot be more that 5")
            }
        }
    },
    about:{
        type:String,
        default:"This is the default desfription for every user"
    }

},{
    timestamps:true
})


module.exports = mongoose.model("User",userSchema)