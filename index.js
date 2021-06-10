const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const incomingInvoiceRouter = require('./routes/incomingInvoice')
const invoiceProductRouter = require('./routes/invoiceProduct')
const saleRouter = require('./routes/sale')

const app = express()

const url = "mongodb+srv://Sherif:rAzCmDang1ZCsYnc@cluster0.qwr9u.mongodb.net/storage_restapi?retryWrites=true&w=majority"


app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/auth', authRouter)
app.use('/api/incoming-invoice',incomingInvoiceRouter)
app.use('/api/invoice-product', invoiceProductRouter)
app.use('/api/sale', saleRouter)

app.use(function (error, req, res, next) {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(result => {
    app.listen(3000)
    console.log("Connected")
}).catch(err => {
    console.log(err)
})
