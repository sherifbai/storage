const {Router} = require('express')
const {body} = require('express-validator')

const incomingInvoiceController = require('../controller/incomingInvoice')

const router = Router()

router.post('/', [
    body('name')
        .trim()
        .isLength({min: 5}),
    body('barcode')
        .trim()
        .isLength({min: 5}),
    body('amount')
        .isNumeric(),
    body('unit')
        .trim(),
    body('pricePerUnit')
        .isNumeric(),
], incomingInvoiceController.addIncomingInvoice)
router.put('/:id',[
    body('name')
        .trim()
        .isLength({min: 5}),
    body('barcode')
        .trim()
        .isLength({min: 5}),
    body('amount')
        .isNumeric(),
    body('unit')
        .trim(),
    body('pricePerUnit')
        .isNumeric(),
], incomingInvoiceController.updateIncomingInvoice)
router.delete('/:id', incomingInvoiceController.deleteIncomingInvoice)

module.exports = router
