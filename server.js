/** Packages */
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const morgan = require('morgan')
//const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require("./auth/db")

/**routes */
const authRoutes = require("./auth/routes/authRoutes")
const errorHandler = require("./middlewares/errorMiddleware")


/** Rest Object */
const app = express()


/** .env */
dotenv.config()


/** MONGOOSE */
connectDB();

/** Middleware */
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.json())

/** Server Port */
app.listen(
    8080,
    () => {
        console.log(`server Running on ${process.env.PORT}`)
    }
)

/**API Routes */
app.use('/api/v1/auth', authRoutes)