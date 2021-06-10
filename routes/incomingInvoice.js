const {Router} = require('express')
const {body} = require('express-validator')


const isAuth = require('../middleware/isAuth')
const incomingInvoiceController = require('../controller/incomingInvoice')


const router = Router()


router.get('/', isAuth, incomingInvoiceController.getIncomingInvoices)
router.post('/add', [
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
], isAuth, incomingInvoiceController.addIncomingInvoice)
router.put('/update/:id',[
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
], isAuth, incomingInvoiceController.updateIncomingInvoice)
router.delete('/delete/:id', isAuth, incomingInvoiceController.deleteIncomingInvoice)


module.exports = router
