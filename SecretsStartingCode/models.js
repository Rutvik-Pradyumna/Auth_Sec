const mongoose=require('mongoose')
const encrypt=require('mongoose-encryption')

const userSchema=new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : String
})

// This is level-2 : Encryption
// userSchema.plugin(encrypt, {
//     secret : process.env.SECRET, 
//     encryptedFields: ["password"]
// })

const User=new mongoose.model("User",userSchema)

module.exports={
    User
}