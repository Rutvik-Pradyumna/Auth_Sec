const models=require('./models')
const md5=require('md5') // level-3
const bcrypt=require('bcryptjs') // level-4
const passport = require('passport')
const saltRounds=10 

let User=models.User
let getHome = (req,res) => { res.render("home") }
let getLogin = (req,res) => { res.render("login") }
let getRegister = (req,res) => { res.render("register") }
let googleAuth = (req,res) => {
    passport.authenticate('google',{ scope : ["profile"] })(req,res)
}
let googleAuthSecrets = (req,res,next) => {
    passport.authenticate('google', {
        successRedirect: '/secrets',
        failureRedirect: '/login'
    })(req,res,next)
    // remember how **req,res,next are used in these 2 methods**
}
let getSubmit = (req,res)=> {
    if(req.isAuthenticated()){
        res.render("submit")
    } else {
        res.redirect('/login')
    }
}
let postSubmit = (req,res) => {
    let inSecret = req.body.secret 
    // passport will save user details in req (req.user)
    // that logged in to current session
    models.User.findById(req.user.id)
    .then(foundUser => {
        if(foundUser) {
            foundUser.secret=inSecret 
            return foundUser.save()
        }
    })
    .then(() => {res.redirect('/secrets')})
    .catch(err => console.log(err))
}
let getSecrets = (req,res) => {
    User.find({'secret' : {$ne:null}})
    .then(foundUser => {
        if(foundUser){
            res.render('secrets',{usersWithSecrets : foundUser})
        }
    })
    .catch(err => console.log(err))
}
let getLogout = (req,res) => {
    req.logout((err) => console.log(err))
    res.redirect('/')
}
let postRegister = (req,res)=>{
    models.User.register({username : req.body.username},req.body.password,function(err,user){
            if(err){
                console.log(err)
                res.redirect('/register')
            } else {
                passport.authenticate("local")(req,res,function(){
                    res.redirect("/secrets")
                })
            }
        }
    )
}
let postLogin = (req,res)=>{
    const logUser = new models.User({
        username: req.body.username,
        password: req.body.password 
    })
    req.login(logUser,function(err){
        if(err){
            console.log(err)
            res.redirect('/login')
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets")
            })
        }
    })
}
module.exports = {
    getHome,
    getLogin,
    getRegister,
    getSecrets,
    postRegister,
    postLogin,
    getLogout,
    googleAuth,
    googleAuthSecrets,
    getSubmit,
    postSubmit
}





/*
level - 4

let postRegister = (req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, (err,hash)=>{
        let newUser=new User({
            email : req.body.username,
            password : hash
        })
        newUser.save().then(()=>{
                res.render('secrets')
            }
        ).catch((err)=>{
            console.log(err)
        })
    })
}

let postLogin = (req,res)=>{
    let username=req.body.username
    let password=req.body.password
    User.findOne({email: username}).then(
        (foundUser)=>{
            if(foundUser){
                bcrypt.compare(password,foundUser.password,(err,result)=>{
                    if(result===true) res.render('secrets')
                })
            }
        }
    ).catch( (err) => console.log(err) )
}

*/ 