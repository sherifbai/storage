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
    body('invoiceNumber')
        .isNumeric()
        .not()
        .isEmpty(),
    body('firm')
        .trim()
        .not()
        .isEmpty(),
    body('contractAmount')
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
    body('invoiceNumber')
        .isNumeric()
        .not()
        .isEmpty(),
    body('firm')
        .trim()
        .not()
        .isEmpty(),
    body('contractAmount')
        .isNumeric()
        .not()
        .isEmpty(),
], incomingInvoiceController.updateIncomingInvoice)

router.delete('/:id', incomingInvoiceController.deleteIncomingInvoice)

module.exports = router
