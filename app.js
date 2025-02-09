const express = require('express')
const app = express()
const cors = require('cors')
const ejs = require('ejs')

const session = require('express-session')
const MongoStore = require('connect-mongo')

const userRouter = require('./routes/user.route')
const passport = require('passport')

require('./config/db')
require('dotenv').config()
require('./config/passport')

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//session creating (Express session middleware)
app.set('trust proxy', 1)
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
            collectionName: "sessions"
        })
    })
)
app.use(passport.initialize()) //Starts passport (passport middleware)
app.use(passport.session()) // Enables session based authentication (passport middleware)

//routes
app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.status(200).send('testing server')
})

//routes error handling
app.use((req, res, next) => {
    res.status(404).send("Routes not Found")
})

//server error handling
app.use((err, req, res, next) => {
    res.status(500).send("Something Broke")
})

module.exports = app