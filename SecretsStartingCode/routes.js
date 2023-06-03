const express=require('express')
const router=express.Router()
const myMethods = require('./methods')

router.route('/')
.get(myMethods.getHome)

router.route('/login')
.get(myMethods.getLogin)
.post(myMethods.postLogin)

router.route('/register')
.get(myMethods.getRegister)
.post(myMethods.postRegister)

module.exports = router 