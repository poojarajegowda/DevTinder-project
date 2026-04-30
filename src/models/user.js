const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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

userSchema.methods.getJWT = async function() {
    const user = this

    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{ expiresIn: "7d" })
    console.log(token)

    return token;
}


userSchema.methods.validatePassword = async function (inputPasswordByUser){

const user = this
const hashPassword = user.password
const validPassword = await bcrypt.compare(inputPasswordByUser,hashPassword)

return validPassword;

}

// userSchema.pre("save", async function(next) {
//     const user = this
    
//     if (!user.isModified("password")) return next()
    
//     const hashedPassword = await bcrypt.hash(user.password, 10)
//     user.password = hashedPassword
    
//     next()
// })

module.exports = mongoose.model("User",userSchema)