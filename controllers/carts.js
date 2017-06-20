const passport = require('../config/passport');
var router = require('express').Router();
const Order = require('../models/Order');
const ProductOrder = require('../models/ProductOrder');

var userId;
/**
 * GET /carts
 * Carts page.
 */
/*
router.get('/carts/:id/:_csrf', function (req, res, next) {

    console.log("GET GET GET CARTS");

    var data = {
            "id": req.params.id,
            "csrf": req.params._csrf
    };

    if (passport.isAuthenticated) {
        console.log(req.user._id);
        userId = req.user._id;
    } else {
        res.redirect('/login');
    }

    Order.find({ userId: req.user._id, 'paymentTrans.servicePaymentDetails.transId': null })
        .populate('carts')
        .lean()
        .exec(function (err, carts) {
            carts.forEach(function(elem){
                console.log("CARTS = " + JSON.stringify(elem.productOrder));
            });

            res.render('account/carts', {
                title: 'ניהול עגלות שללא מומשו',
                angularApp: 'storeApp',
                carts: carts
            });
        });
});
*/

exports.getCarts = (req, res) => {

    if (passport.isAuthenticated) {
        console.log(req.user._id);
        userId = req.user._id;
    } else {
        res.redirect('/login');
    }

    Order.find({ userId: req.user._id, 'paymentTrans.servicePaymentDetails.transId': null })
        .populate('carts')
        .lean()
        .exec(function (err, carts) {
            carts.forEach(function(elem){
                console.log("CARTS = " + JSON.stringify(elem.productOrder));
            });

            res.render('account/carts', {
                title: 'ניהול עגלות שללא מומשו',
                angularApp: 'storeApp',
                carts: carts
            });
        });
};

exports.pushCart = (req, res) => {

    if (passport.isAuthenticated) {
        console.log(req.user._id);
        userId = req.user._id;

        Order.findOne({ _id: req.body.id})
            .select('-_id productOrder')
            .exec(function (err, orderObj) {
                if(!err) {
                    var productOrder = orderObj.productOrder;
                    //products.forEach(function(elem){
                    console.log("products = " + JSON.stringify(productOrder));
                    //});

                    //console.log("REQ._ID " + req.body.id);

                    res.render('store/cart', {
                        title: 'MyCart',
                        angularApp: 'storeApp',
                        products: productOrder
                    });
                }
            });

    } else {
        res.redirect('/login');
    }
};