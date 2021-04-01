const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')

router.post('/', loginController.login)
router.get('/', loginController.checkSession)
router.get('/logout', loginController.logout)


module.exports = router