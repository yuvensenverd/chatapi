const express = require('express')
const { userController } = require('../controllers')

const router = express.Router()

router.post('/loginuser', userController.loginUser)
router.post('/registeruser', userController.registerUser)


module.exports = router