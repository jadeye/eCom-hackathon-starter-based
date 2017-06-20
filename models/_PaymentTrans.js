const mongoose = require('mongoose');
const servicePaymentDetails = require('./ServicePaymentDetails').schema;

const PaymentTransSchema = new mongoose.Schema({
    transId: { type: mongoose.Schema.Types.ObjectId },
    servicePaymentDetails: [servicePaymentDetails]
}, { timestamps: true });

const PaymentTransactions = mongoose.model('PaymentTransactions', PaymentTransSchema );

module.exports = PaymentTransactions;
