const express = require('express')
const server = express()
const {restart} = require('nodemon')
const bodyParser = require('body-parser')
require('dotenv/config')
const mongoose = require('mongoose')
const StoreRouter = require('./routes/store')
const CustomerRouter = require('./routes/customer')
const AdminRouter = require('./routes/admin')
server.use(bodyParser.json())
server.use('/store',StoreRouter)
server.use('/store/account',CustomerRouter)
server.use('/admin',AdminRouter)


server.get('/',(req,res)=>{
    res.send('hello')
})
mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
console.log('DB connected')
})
server.listen(3000,()=>{
    console.log('Server is running')
})