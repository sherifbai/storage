const {Router} = require('express')
const {body} = require('express-validator')


const isAuth = require('../middleware/isAuth')
const invoiceProductController = require('../controller/invoiceProduct')


const router = Router()


router.get('/:invoiceProductId', isAuth, invoiceProductController.getInvoiceProduct)
router.get('/',isAuth , invoiceProductController.getInvoiceProducts)
router.post('/add', [
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
], isAuth, invoiceProductController.addInvoiceProduct)
router.put('/update/:id', [
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
], isAuth, invoiceProductController.updateInvoiceProduct)
router.delete('/delete/:id', isAuth, invoiceProductController.deleteInvoiceProduct)


module.exports = router
