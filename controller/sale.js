const Sale = require('../models/sale')
const ProductCount = require('../models/productsCount')
const InvoiceProduct = require('../models/invoiceProduct')


const {validationResult} = require('express-validator')


exports.addSale = async (req, res, next) => {
    const productId = req.body.productId
    const newQuantity = req.body.quantity
    let oldQuantity

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Ошибка при валидации!')
        error.statusCode = 422
        throw error
    }

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


exports.getSales = async (req, res, next) => {
    try {
        const sales = await Sale.find()

        console.log(sales)

        const products = await Promise.all(sales.map(async (item) => {
            return await InvoiceProduct.find({_id: item.productId});
        }));

        res.status(200).json({
            success: true,
            data: { sales , products }
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


exports.getSale = async (req, res, next) => {
    const saleId = req.params.saleId

    try {
        const sale = await Sale.findById(saleId)

        const product = await InvoiceProduct.findById(sale.productId)

        if (!sale) {
            const error = new Error('Данные не найдены!')
            error.statusCode = 500
            throw error
        }

        res.status(200).json({
            success: true,
            data: {sale, product}
        })
    } catch (error) {
        
    }
}
