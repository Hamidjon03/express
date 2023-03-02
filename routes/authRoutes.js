const { Router } = require('express')
const router = Router()
const { getRegisterPage, getLoginPage} = require('../controllers/authControllers');


router.get('/login', getLoginPage)
router.get('/signup', getRegisterPage)

module.exports = router