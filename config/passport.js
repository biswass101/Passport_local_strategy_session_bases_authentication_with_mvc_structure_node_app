const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')


passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({username: username})
            if(!user) {
                return done(null, false, {message: "Incorrect Username"})
            }
            if(!bcrypt.compare(password, user.password)) {
                return done(null, false, {message: "Incorrect Password"})
            }
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    })
)

// Store user ID in session
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//Retrieve user details using the session ID
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
})