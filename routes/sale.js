const {Router} = require('express')
const {body} = require('express-validator')


const isAuth = require('../middleware/isAuth')
const saleController = require('../controller/sale')


const router = Router()


router.get('/:saleId', isAuth, saleController.getSale)
router.get('/', isAuth, saleController.getSales)
router.post('/add', [
    body('quantity')
        .isNumeric()
], isAuth, saleController.addSale)


module.exports = router
