const {Router} = require('express')
const {body} = require('express-validator')

const incomingInvoiceController = require('../controller/incomingInvoice')

const router = Router()

router.post('/', incomingInvoiceController.addIncomingInvoice)
router.put('/:id', incomingInvoiceController.updateIncomingInvoice)
router.delete('/:id', incomingInvoiceController.deleteIncomingInvoice)

module.exports = router
