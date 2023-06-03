const models=require('./models')
const md5=require('md5') // level-3
const bcrypt=require('bcryptjs') // level-4
const saltRounds=10 

let User=models.User
let getHome = (req,res) => { res.render("home") }
let getLogin = (req,res) => { res.render("login") }
let getRegister = (req,res) => { res.render("register") }
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

module.exports = {
    getHome,
    getLogin,
    getRegister,
    postRegister,
    postLogin
}