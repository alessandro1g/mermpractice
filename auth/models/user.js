const mongoose = require('mongoose')
const bcrypt = require('bcrypt.js')
const JWT = require('jsonwebtoken')
const cookie = require('cook')

/** MODELS */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Enter Username']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minlength: [6, "Password requires at least 6 characters"]
    },
    userID: {
        type: String,
        default: ""
    },
    subscription: {
        type: String,
        default: ""

    }

})

//hashed password
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

//Match password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

/** Sign Token */
userSchema.methods.getSignedToken = function (res) {
    const accessToken = JWT.sign({ id: this._id }.process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIREIN })
    const refreshToken = JWT.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIREIN })
    res.cookie('refreshToken', `${refreshToken}`, {
        maxAge: 86400 * 7000,
        httpsOnly: true
    })
}

const User = mongoose.model('User', userSchema)
module.exports = User;