const express = require('express')
const { registerController, loginController } = require('../controllers/authController')


/**router objects */
const router = express.Router()

/**routes */
/**register */
router.post('/register', registerController)

/**login */
router.post('/login', loginController)

/**logout */
router.post('/logout', logoutController) 