const {Router} = require('express')

const saleController = require('../controller/sale')

const router = Router()

router.post('/', saleController.addSale)

module.exports = router
