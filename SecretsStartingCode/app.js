//jshint esversion:6
require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const mongoose=require('mongoose')
const router=require('./routes')

const app=express()

const url="mongodb://0.0.0.0:27017/userDB"

app.use(express.static('public'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended : true}) )

mongoose.connect(url)

app.use('/',router)

app.listen(process.env.PORT || 3000,() => {
    console.log('http://localhost:3000')
})