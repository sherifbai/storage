const {Router} = require('express')
const {body} = require('express-validator')

const isAuth = require('../middleware/isAuth')
const saleController = require('../controller/sale')

const router = Router()

router.post('/', [
    body('quantity')
        .isNumeric()
], isAuth, saleController.addSale)

module.exports = router
