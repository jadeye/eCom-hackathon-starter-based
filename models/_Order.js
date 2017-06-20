const mongoose = require('mongoose');
const productOrder = require('./ProductOrder').schema;
//const User = require('../models/User');

/*
const productOrderSchema = new mongoose.Schema({
    sku: { type: String, default: '' },
    name: { type: String, default: '' },
    quantity: { type: Number, default: '' },
    price: { type: Number, default: '' },
    total: { type: Number, default: '' }
});
*/

const orderSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId },
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productOrder: [productOrder],
    totalPerOrder: {type: Number, default:''},
    paymentTrans: {
        serviceName: { type: String, default: '' },
        timestampSent: { type: Date, default: Date.now },
        timestampApproved: { type: Date, default: Date.now },
        trandId: { type: Number, default: '' }
    }
}, { timestamps: true });

//const ProductOrder = mongoose.model('ProductOrder', productOrderSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
//module.exports = ProductOrder;