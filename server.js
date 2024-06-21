import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bookRouter from './router/bookRouter.js'
import connectDB from './config/dbConnect.js'



dotenv.config()
const server = express()
connectDB()



server.use(express.json())
server.use('/books', bookRouter)




mongoose.connection.once('open', () => {
    server.listen(process.env.PORT, (err) => {
        err ? console.log('Server error') : console.log(`Server is running on ${process.env.PORT}`)
    })
})


