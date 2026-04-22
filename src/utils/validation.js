const validator = require("validator")

const validateSignupData = (req) => {
   const {firstName , lastName , emailID , password} = req.body

   if(!firstName || !lastName){
    throw new Error("Enter valid name")
   } else if(firstName.length<4 || firstName.length>50){
    throw new Error("The firstname should be greater than 4 and less than 50")
   } else if(lastName.length<1 || lastName.length>50){
    throw new Error("The lastname should be greater than 1 and less than 50")
   } else if(!validator.isEmail(emailID)){
    throw new Error("Enter valid email ID")
   } else if(!validator.isStrongPassword(password)){
    throw new Error("Enter strong password")
   }

}

module.exports = {
    validateSignupData
}
