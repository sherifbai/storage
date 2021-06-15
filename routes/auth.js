const {Router} = require('express')
const {body} = require('express-validator')


const isAuth = require('../middleware/isAuth')
const User = require('../models/user')
const authController = require('../controller/auth')


const router = Router()


router.get('/', isAuth, authController.getUsers)
router.post('/signup', [
    body('login')
        .isLength({min: 5})
        .trim()
        .custom((value, {req}) => {
            return User.findOne({login: value}).then(userDoc => {
                if (userDoc) {
                    return Promise.reject("Логин уже занят!!!")
                }
            })
        })
        .not()
        .isEmpty(),
    body('password')
        .isLength({min: 5})
        .trim()
        .not()
        .isEmpty()
], authController.signUp)
router.post('/login', [
    body('login')
        .isLength({min: 5})
        .trim()
        .not()
        .isEmpty(),
    body('password')
        .isLength({min: 5})
        .trim()
        .not()
        .isEmpty()
], authController.login)


module.exports = router
