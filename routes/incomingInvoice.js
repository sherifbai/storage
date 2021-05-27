const {Router} = require('express')
const {body} = require('express-validator')

const incomingInvoiceController = require('../controller/incomingInvoice')

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
], incomingInvoiceController.addIncomingInvoice)
router.put('/:id',[
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
], incomingInvoiceController.updateIncomingInvoice)
router.delete('/:id', incomingInvoiceController.deleteIncomingInvoice)

module.exports = router
