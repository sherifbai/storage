const {Router} = require('express')
const {body} = require('express-validator')

const saleController = require('../controller/sale')

const router = Router()

router.post('/', [
    body('quantity')
        .isNumeric()
], saleController.addSale)

module.exports = router
