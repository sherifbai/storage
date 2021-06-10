const {Schema, model} = require('mongoose')

const incomingInvoice = new Schema({
    name: {
        type: String,
        required: true
    },
    invoiceNumber: {
      type: String,
      required: true
    },
    count: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        default: 0
    },
    firm: {
        type: String,
        required: true
    },
    contractAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = model('incomingInvoice', incomingInvoice)
