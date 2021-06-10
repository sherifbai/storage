const InvoiceProduct = require('../models/invoiceProduct')
const IncomingInvoice = require('../models/incomingInvoice')
const ProductsCount = require('../models/productsCount')
const Sale = require('../models/sale')

const {validationResult} = require('express-validator')

exports.addInvoiceProduct = async (req, res, next) => {
    const name = req.body.name
    const barcode = req.body.barcode
    const amount = req.body.amount
    const unit = req.body.unit
    const pricePerUnit = req.body.pricePerUnit
    const incomingInvoiceId = req.body.incomingInvoiceId

    const errors = validationResult(req)


    try {
        const incomingInvoice = await IncomingInvoice.findById(incomingInvoiceId)

        if (!incomingInvoice) {
            const error = new Error("Даные не найдены!!")
            error.statusCode = 404
            throw  error
        }

        const invoiceProduct = new InvoiceProduct({
            name: name,
            barcode: barcode,
            amount: amount,
            unit: unit,
            pricePerUnit: pricePerUnit,
            incomingInvoiceId: incomingInvoiceId
        })

        await invoiceProduct.save();


        await SumTotalAmount(incomingInvoiceId, incomingInvoice)

        const productsCount = new ProductsCount({
            productId: invoiceProduct._id,
            in: amount
        })

        await productsCount.save()

        res.status(201).json({
            success: true,
            message: "Invoice product created",
            data: null
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.updateInvoiceProduct = async (req, res, next) => {
    const invoiceProductId = req.params.id

    const updatedName = req.body.name
    const updatedBarcode = req.body.barcode
    const updatedAmount = req.body.amount
    const updatedUnit = req.body.unit
    const updatedPricePerUnit = req.body.pricePerUnit

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Провальная валидация')
        error.statusCode = 422
        throw error
    }
    try {
        const invoiceProduct = await InvoiceProduct.findById(invoiceProductId)

        const incomingInvoice = await IncomingInvoice.findById(invoiceProduct.incomingInvoiceId)

        if (!invoiceProduct) {
            const error = new Error("Данные не найдены!!")
            error.statusCode = 404
            throw error
        }

        await saleCheck(invoiceProductId)

        invoiceProduct.name = updatedName
        invoiceProduct.barcode = updatedBarcode
        invoiceProduct.amount = updatedAmount
        invoiceProduct.unit = updatedUnit
        invoiceProduct.pricePerUnit = updatedPricePerUnit

        await invoiceProduct.save()


        const productsCount = await ProductsCount.findOne({productId: invoiceProductId})
        productsCount.in = updatedAmount
        await productsCount.save()

        const incomingInvoiceId = invoiceProduct.incomingInvoiceId


        await SumTotalAmount(incomingInvoiceId, incomingInvoice)

        res.status(200).json({
            success: true,
            message: "Invoice product updated",
            data: null
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.deleteInvoiceProduct = async (req, res, next) => {
    const invoiceProductId = req.params.id

    try {
        const invoiceProduct = await InvoiceProduct.findById(invoiceProductId)

        await saleCheck(invoiceProductId)

        const incomingInvoice = await IncomingInvoice.findById(invoiceProduct.incomingInvoiceId)

        if (!invoiceProduct) {
            const error = new Error('Данные не найдены!')
            error.statusCode = 404
            throw error
        }

        await InvoiceProduct.findByIdAndRemove(invoiceProduct)


        await ProductsCount.deleteOne({productId: invoiceProductId})


        const incomingInvoiceId = invoiceProduct.incomingInvoiceId


        await SumTotalAmount(incomingInvoiceId, incomingInvoice)


        res.status(200).json({
            success: true,
            message: "Invoice product deleted!",
            data: null
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const saleCheck = async (invoiceProductId) => {
    const sale = await Sale.findOne({productId: invoiceProductId})

    if (sale) {
        throw new Error('Вы не можете удалить или изменить данные')
    } else {
        return true
    }
}

const SumTotalAmount = async (incomingInvoiceId, incomingInvoice) => {
    const count = await InvoiceProduct.find({incomingInvoiceId: incomingInvoiceId}).countDocuments()
    const inv = await InvoiceProduct.find({incomingInvoiceId: incomingInvoiceId})
    let sum = 0;
    inv.forEach(el => {
        sum += (el.pricePerUnit * el.amount);
    });

    incomingInvoice.count = count;
    incomingInvoice.amount = sum;

    await incomingInvoice.save();
}

exports.getInvoiceProducts = async (req, res , next) => {
    try {
        const invoiceProducts = await InvoiceProduct.find()

        res.status(200).json({
            success: true,
            message: 'InvoiceProducts selected successfully',
            data: invoiceProducts,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
