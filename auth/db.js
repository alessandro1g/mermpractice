const mongoose = require('mongoose')
const dotenv = require('dotenv')


/** Mongoose */ 
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGOURL)
        console.log("Connected to MONGODB")
        console.log(`${mongoose.connection.host}`)

    }catch (error){
        console.log(`Mongoose Error - ${error}`)
    }
}

module.exports = connectDB