const passport = require('passport');
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleHomeView = (req, res) => {
    res.render('index')
}

const handleRegisterView = (req, res) => {
    res.render('register')
}

//creating user
const handleRegister = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })

        if(user) {
            return res.status(400).send("user already exists")
        }

        //password encrypting ans stroing
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) =>{
            const newUser = new User({
                username: req.body.username,
                password: hash
            })

            await newUser.save()
            res.redirect('/user/login')
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const checkLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/user/profile')
    }
    next()
}
const handleLoginView = (req, res) => {
    res.render('login')
}

const handleLogin = passport.authenticate('local', {
    failureRedirect: '/user/login',
    successRedirect: '/user/profile'
})

const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/user/login')
}
const handleProfileView = (req, res) => {
    res.render('profile')
}

const handleLogout =  (req, res) => {
    try {
        req.logOut((err) => {
            if(err) return next(err)
            res.redirect('/user')
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    handleHomeView, 
    handleRegisterView, 
    handleRegister,
    handleLoginView,
    handleLogin,
    handleProfileView,
    handleLogout,


    checkLoggedIn,
    checkAuthenticated
}