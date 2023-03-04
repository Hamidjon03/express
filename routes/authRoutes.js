const { Router } = require('express')
const router = Router()
const { getRegisterPage, getLoginPage, registerNewUser } = require('../controllers/authControllers');


router.get('/login', getLoginPage)
router.get('/signup', getRegisterPage)
router.post('/signup', registerNewUser)

module.exports = router