const {Router} = require('express')

const invoiceProductController = require('../controller/invoiceProduct')

const router = Router()

router.post('/', invoiceProductController.addInvoiceProduct)
router.put('/:id', invoiceProductController.updateInvoiceProduct)
router.delete('/:id', invoiceProductController.deleteInvoiceProduct)

module.exports = router
