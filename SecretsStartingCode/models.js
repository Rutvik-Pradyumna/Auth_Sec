const mongoose=require('mongoose')
const encrypt=require('mongoose-encryption')
const passport=require('passport')
const passportLocalMongoose=require('passport-local-mongoose')
const GoogleStrategy=require('passport-google-oauth20').Strategy
const findOrCreate=require('mongoose-findorcreate')

const userSchema=new mongoose.Schema({
    email : {
        type : String
    },
    password : String,
    googleId : String,
    secret : String 
})

// This is level-2 : Encryption
// userSchema.plugin(encrypt, {
//     secret : process.env.SECRET, 
//     encryptedFields: ["password"]
// })

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

const User=new mongoose.model("User",userSchema)

passport.use(User.createStrategy())
// passport.serializeUser(User.serializeUser()) // for passport-local-mongoose
// passport.deserializeUser(User.deserializeUser())
passport.serializeUser(function(User,done){
    done(null,User.id)
})
passport.deserializeUser(function(id,done){
    User.findById(id)
    .exec()
    .then(user => done(null,user))
    .catch(err => done(err,null))
})
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    })
  }
))

module.exports={
    User
}