const {Schema, model} = require('mongoose')

const productsCountSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'invoiceProduct',
        required: true
    },
    in: {
        type: Number,
        required: true
    },
    out: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = model('productsCount', productsCountSchema)
