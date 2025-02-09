require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
 .then(() => console.log('Atlash DB is connected'))
 .catch(err => console.log(err.message))