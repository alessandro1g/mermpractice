const errorResponse = require('../../utils/errorResponse')
const userModel = require('../models/user')

/**REgister */
exports.registerController = async () => {
    try {
        const { username, email, password } = req.body
        // if ther is an existing user
        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            return next(new errorResponse('Email is already register', 500))
        }
        const user = await userModel.create({ username, email, password })
        sendToken(user, 201, res)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
/**login */
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return next(new errorResponse("please provide email or password"))
        }
    } catch (error) {

    }
}
exports.logoutController = async () => { }

/**Token */
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken
    res.status(statusCode).json({
        success: true,
        token,
    })
}