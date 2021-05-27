const IncomingInvoice = require('../models/incomingInvoice')
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
            data: null
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
