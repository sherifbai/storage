const IncomingInvoice = require('../models/incomingInvoice')
const InvoiceProduct = require('../models/invoiceProduct')
const ProductsCount = require('../models/productsCount')


const {validationResult} = require('express-validator')


exports.addIncomingInvoice = async (req, res, next) => {
    const name = req.body.name
    const invoiceNumber = req.body.invoiceNumber
    const firm = req.body.firm
    const contractAmount = req.body.contractAmount

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Ошибка при валидации!')
        error.statusCode = 422
        throw error
    }

    try {
        const incomingInvoice = new IncomingInvoice({
            name: name,
            invoiceNumber: invoiceNumber,
            firm: firm,
            contractAmount: contractAmount
        })

        await incomingInvoice.save()

        res.status(201).json({
            success: true,
            message: 'Invoice created!',
            data: incomingInvoice
        })
    } catch (error) {
        if (error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


exports.updateIncomingInvoice = async (req, res, next) => {
    const incomingInvoiceId = req.params.id

    const updatedName = req.body.name
    const updatedInvoiceNumber = req.body.invoiceNumber
    const updatedFirm = req.body.firm
    const updatedContractAmount = req.body.contractAmount

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Ошибка при валидации!')
        error.statusCode = 422
        throw error
    }

    try {
        const incomingInvoice = await IncomingInvoice.findById(incomingInvoiceId)

        if (!incomingInvoice) {
            const error = new Error("Данные не найдены!")
            error.statusCode = 404
            throw error
        }

        incomingInvoice.name = updatedName
        incomingInvoice.invoiceNumber = updatedInvoiceNumber
        incomingInvoice.firm = updatedFirm
        incomingInvoice.contractAmount = updatedContractAmount

        incomingInvoice.save()

        res.status(200).json({
            success: true,
            message: "Invoice updated!",
            data: null
        })

    } catch (error) {
        if (!error.statusCode) {
           error.statusCode = 500
        }
        next(error)
    }
}


exports.deleteIncomingInvoice = async (req, res, next) => {
    const incomingInvoiceId = req.params.id

    try {
        const incomingInvoice = await IncomingInvoice.findById(incomingInvoiceId)

        if (!incomingInvoice) {
            const error = new Error("Данные не найдены!")
            error.statusCode = 404
            throw error
        }

        await deleteProduct(incomingInvoiceId)

        await IncomingInvoice.findByIdAndRemove(incomingInvoiceId)

        res.status(200).json({
            success: true,
            message: "Invoice deleted!",
            data: null
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


exports.getIncomingInvoices = async (req, res, next) => {
    try {
        const incomingInvoices = await IncomingInvoice.find()

        res.status(200).json({
            success: true,
            data: incomingInvoices
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


exports.getIncomingInvoice = async (req, res, next) => {
    const incomingInvoiceId = req.params.incomingInvoiceId

    try {
        const incomingInvoice = await IncomingInvoice.findById(incomingInvoiceId)

        if (!incomingInvoice) {
            const error = new Error("Данные не найдены!")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            data: incomingInvoice
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


const productCheck = async (incomingInvoiceId) => {
    const product = await InvoiceProduct.findOne({incomingInvoiceId: incomingInvoiceId})

    if (product) {
        throw new Error('Вы не можете удалить или изменить данные')
    } else {
        return true
    }
}


const deleteProduct = async (incomingInvoiceId) => {
    const products = await InvoiceProduct.find({incomingInvoiceId: incomingInvoiceId})
    
    await Promise.all(products.map(async (file) => {
        await InvoiceProduct.findByIdAndRemove(file._id)

        await deleteProductsCount(file._id)
    }))
}


const deleteProductsCount = async (productId) => {
    const products = await ProductsCount.find({productId: productId})
    
    await Promise.all(products.map(async (file) => {
        await ProductsCount.findByIdAndRemove(file._id)
    }))
}
