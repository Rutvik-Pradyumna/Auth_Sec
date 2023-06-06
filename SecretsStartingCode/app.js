//jshint esversion:6
require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const mongoose=require('mongoose')
const session=require('express-session')
const passport=require('passport')
const router=require('./routes')


const app=express()

const url="mongodb://0.0.0.0:27017/userDB"

app.use(express.static('public'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended : true}) )
app.use(session({
    secret : "CanYouSeeMySecretProwler",
    resave : false,  // default true but we want false
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',router)

mongoose.connect(url)

app.listen(process.env.PORT || 3000,() => {
    console.log('http://localhost:3000')
})