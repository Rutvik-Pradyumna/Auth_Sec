const express=require('express')
const router=express.Router()
const myMethods = require('./methods')

router.route('/')
.get(myMethods.getHome)

router.route('/auth/google')
.get(myMethods.googleAuth)

router.route('/auth/google/secrets')
.get(myMethods.googleAuthSecrets)

router.route('/submit')
.get(myMethods.getSubmit)
.post(myMethods.postSubmit)

router.route('/secrets')
.get(myMethods.getSecrets)

router.route('/login')
.get(myMethods.getLogin)
.post(myMethods.postLogin)

router.route('/register')
.get(myMethods.getRegister)
.post(myMethods.postRegister)

router.route('/logout')
.get(myMethods.getLogout)

module.exports = router 