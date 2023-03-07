const { Router } = require('express')
const router = Router()
const { getRegisterPage, logout, getLoginPage, registerNewUser, loginUser } = require('../controllers/authControllers');
const {guest} = require("../middleware/auth")

router.get('/login', guest, getLoginPage)
router.get('/signup', guest, getRegisterPage)
router.post('/signup', guest, registerNewUser)
router.post('/login', guest, loginUser)
router.get('/logout', logout)

module.exports = router