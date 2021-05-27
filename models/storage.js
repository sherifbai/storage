const {Schema, model} = require('mongoose')

const storageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    }
})

module.exports = model('Storage', storageSchema)
