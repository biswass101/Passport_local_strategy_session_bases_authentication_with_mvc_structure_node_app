const express = require('express')
const { handleHomeView, 
    handleRegisterView, 
    handleRegister, 
    handleLoginView, 
    handleLogin, 
    handleProfileView, 
    handleLogout, 
    checkLoggedIn, 
    checkAuthenticated 
} = require('../controllers/user.controller')
const router = express.Router()
const passport = require('passport')

//base url
router.get('/', handleHomeView)

//register : get
router.get('/register', handleRegisterView)

//resgister : post
router.post('/register', handleRegister)

//login : get
router.get('/login', checkLoggedIn, handleLoginView)

//login : post
router.post('/login',  handleLogin)

//profile protected route
router.get('/profile', checkAuthenticated, handleProfileView)

//logout route
router.get('/logout', handleLogout)

module.exports = router