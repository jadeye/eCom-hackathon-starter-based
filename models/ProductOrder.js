const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
    sku: { type: String, default: '' },
    name: { type: String, default: '' },
    quantity: { type: Number, default: '' },
    price: { type: Number, default: '' },
    total: { type: Number, default: '' }
});

const ProductOrder = mongoose.model('ProductOrder', productOrderSchema);

module.exports = ProductOrder;