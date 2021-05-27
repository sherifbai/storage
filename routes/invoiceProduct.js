const {Router} = require('express')
const {body} = require('express-validator')

const invoiceProductController = require('../controller/invoiceProduct')

const router = Router()

router.post('/', [
    body('name')
        .trim()
        .isLength({min: 5})
        .not()
        .isEmpty(),
    body('barcode')
        .trim()
        .isLength({min: 5})
        .not()
        .isEmpty(),
    body('amount')
        .isNumeric()
        .not()
        .isEmpty(),
    body('unit')
        .trim()
        .not()
        .isEmpty(),
    body('pricePerUnit')
        .isNumeric()
        .not()
        .isEmpty(),
], invoiceProductController.addInvoiceProduct)


router.put('/:id', [
    body('name')
        .trim()
        .isLength({min: 5})
        .not()
        .isEmpty(),
    body('barcode')
        .trim()
        .isLength({min: 5})
        .not()
        .isEmpty(),
    body('amount')
        .isNumeric()
        .not()
        .isEmpty(),
    body('unit')
        .trim()
        .not()
        .isEmpty(),
    body('pricePerUnit')
        .isNumeric()
        .not()
        .isEmpty(),
], invoiceProductController.updateInvoiceProduct)


router.delete('/:id', invoiceProductController.deleteInvoiceProduct)

module.exports = router
