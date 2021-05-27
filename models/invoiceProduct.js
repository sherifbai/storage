const {Schema, model} = require('mongoose')

const invoiceProduct = new Schema({
    name: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    incomingInvoiceId: {
        type: Schema.Types.ObjectId,
        ref: 'incomingInvoice',
        required: true
    }
})

module.exports = model('invoiceProduct', invoiceProduct)
