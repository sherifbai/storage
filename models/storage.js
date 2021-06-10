const {Schema, model} = require('mongoose')

const storageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    }
}, { timestamps: true })

module.exports = model('Storage', storageSchema)
