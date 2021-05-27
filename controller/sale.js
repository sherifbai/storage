const Sale = require('../models/sale')
const ProductCount = require('../models/productsCount')
const InvoiceProduct = require('../models/invoiceProduct')

exports.addSale = async (req, res, next) => {
    const productId = req.body.productId
    const newQuantity = req.body.quantity
    let oldQuantity

    try{
        const productCount = await ProductCount.findOne({ productId: productId })
        oldQuantity = productCount.out
        const hasProduct = (productCount.in - productCount.out) >= newQuantity
        if (hasProduct) {
            productCount.out = oldQuantity + newQuantity
            productCount.in = productCount.in - newQuantity
            await productCount.save()
        } else {
            const error = new Error('Smth')
            error.statusCode = 500
            throw error
        }


        const invoiceProduct = await InvoiceProduct.findOne({_id: productId})

        const totalAmount = invoiceProduct.pricePerUnit * newQuantity

        const sale = new Sale({
            productId: productId,
            quantity: newQuantity,
            totalAmount: totalAmount
        })

        await sale.save()

        res.status(201).json({
            message: "Sale successfully created!!",
            success: true,
            data: null
        })
    } catch (error) {
       if (!error.statusCode) {
          error.statusCode = 500
       }
       next(error)
    }
}
