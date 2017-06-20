const mongoose = require('mongoose');

const PaymentTransSchema = new mongoose.Schema({
    transId: { type: mongoose.Schema.Types.ObjectId },
    serviceName: { type: String, default: '' },
    serviceTrandId: { type: Number, default: '' },
    totalCharged: { type: Number, default: '' },
    serviceCurrency: { type: Number, default: '' },
    serviceStatus: { type: String, default: '' },
    serviceMsg: { type: String, default: '' },
    timestampSent: { type: Date, default: Date.now },
    timestampApproved: { type: Date, default: Date.now },
}, { timestamps: true });

const PaymentTransactions = mongoose.model('PaymentTransactions', PaymentTransSchema );

module.exports = PaymentTransactions;
