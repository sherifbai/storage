const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/user')

exports.signUp = async (req, res, next) => {
    const login = req.body.login
    const password = req.body.password
    const role = req.body.role

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Неправильная валидация')
        error.statusCode = 422
        throw error
    }

    try {
        const hashedPw = await bcrypt.hash(password, 12)

        const user = new User({
            login: login,
            password: hashedPw,
            role: role
        })

        const result = await user.save()

        res.status(201).json({
            message: "User created!",
            userId: result._id,
            role: result.role
        })
    } catch (error) {
        if (!error.statusCode) {
           error.statusCode = 500
        }
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const login = req.body.login
    const password = req.body.password

    try {
        const user = await User.findOne({login: login})

        if (!user) {
            const error = new Error('Пользователь не найден!')
            error.statusCode = 401
            throw error
        }

        const isEqual = await bcrypt.compare(password, user.password)

        if (!isEqual) {
            const error = new Error('Пароль не совподает!')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign(
            {
                login: user.login,
                userId: user._id.toString()
            },
            "Sherif'sSecretKey",
            { expiresIn: '1h' }
        )
        res.status(200).json({
            token: token,
            login: user.login.toString()
        })
    } catch (error) {
        if (!error.statusCode) {
           error.statusCode = 500
        }
        next(error)
    }

}
