const express = require('express')
const { chatController } = require('../controllers')

const router = express.Router()

router.get('/getmessages', chatController.getMessages)
router.post('/sendmessage', chatController.sendMessage)
router.delete('/clearmessages', chatController.clearMessages)
router.get('/getchannel', chatController.getChannel)

module.exports = router