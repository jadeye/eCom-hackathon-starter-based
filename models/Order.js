const mongoose = require('mongoose');
const productOrder = require('./ProductOrder').schema;
const paymentTrans = require('./PaymentTrans').schema;

const orderSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId },
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productOrder: [productOrder],
    totalPerOrder: {type: Number, default:''},
    paymentTrans: [paymentTrans]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;