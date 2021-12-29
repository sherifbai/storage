const {Router} = require('express')
const {body} = require('express-validator')


const isAuth = require('../middleware/isAuth')
const User = require('../models/user')
const authController = require('../controller/auth')


const router = Router()


router.get('/', isAuth, authController.getUsers)
router.get('/:userId', isAuth, authController.getUser)
router.post('/signup', authController.signUp)
router.post('/login', authController.login)


module.exports = router
