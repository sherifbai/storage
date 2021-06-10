const {Schema, model} = require('mongoose')

const saleSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'invoiceProduct',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number
    }
}, { timestamps: true })

module.exports = model('Sale', saleSchema)
