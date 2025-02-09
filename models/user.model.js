const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        uniquie: true
    },
    password: {
        type: String,
        require: true,
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User