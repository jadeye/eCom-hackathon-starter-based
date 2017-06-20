var mongoose = require('mongoose'),
    Product = require('../models/Product');

/**
 * GET /store
 * List of API examples.
 */

exports.getStorePage = (req, res) => {
    res.render('store/store', {
        title: 'חנות',
        angularApp: 'storeApp'
    });
}
exports.getCartPage = (req, res) => {
    res.render('store/cart', {
        title: 'עגלת הקניות שלי',
        angularApp: 'storeApp'
    })
}
exports.getProductPage = (req, res) => {
    res.render('store/product', {
        title: 'ערכים תזונתיים',
        angularApp: 'storeApp'
    })
}