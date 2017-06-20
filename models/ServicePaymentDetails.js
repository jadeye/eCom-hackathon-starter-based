const mongoose = require('mongoose');

const ServicePaymentDetailsSchema = new mongoose.Schema({
        name: { type: String, default: '' },
        trandId: { type: Number, default: '' },
        totalCharged: { type: Number, default: '' },
        currency: { type: Number, default: '' },
        status: { type: String, default: '' },
        msg: { type: String, default: '' },
        timestampSent: { type: Date, default: Date.now },
        timestampApproved: { type: Date, default: Date.now },
}, { timestamps: true });

const ServicePaymentDetails = mongoose.model('ServicePaymentDetails', ServicePaymentDetailsSchema );

module.exports = ServicePaymentDetails;
