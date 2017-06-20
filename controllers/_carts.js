const passport = require('../config/passport');
const Order = require('../models/Order');
const ProductOrder = require('../models/ProductOrder')

var userId;
/**
 * GET /carts
 * Carts page.
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
                //console.log("CARTS = " + JSON.stringify(elem));
            });

            res.render('account/carts', {
                title: 'ניהול עגלות שללא מומשו',
                angularApp: 'storeApp',
                carts: carts
            });
        });
 };

exports.pushCart = (req, res, next) => {

    if (passport.isAuthenticated) {
        console.log(req.user._id);
        userId = req.user._id;
    } else {
        res.redirect('/login');
    }

    /*Order.findById(req.body.id, function (err, products) {
        var opts = [
            { path: 'productOrder',  model: 'ProductOrder' }
        ]

        Order.populate(products, opts, function (err, products) {
            console.log(products);
        })
    })*/

    /*Order
        .find({ _id: req.body.id, userId: req.user._id })
        .populate('orders')
        .exec(function(err, docs) {
            if(err) return callback(err);
            Order.populate(docs , {
                    path: 'productOrder',
                    model: 'ProductOrder'
                },
                function(err, products) {
                    if(err) return callback(err);
                    console.log(products); // This object should now be populated accordingly.
                });
        });*/

    Order.findOne({ _id: req.body.id})
        .select('-_id productOrder')
        .exec(function (err, orderObj) {
            if(!err) {
                var productOrder = orderObj.productOrder;
                //products.forEach(function(elem){
                console.log("products = " + JSON.stringify(productOrder));
                //});

                console.log("REQ._ID " + req.body.id);
                res.render('store/cart', {
                    title: 'MyCart',
                    angularApp: 'storeApp',
                    products: productOrder
                });
                next()
            }
        });
    /*
    Order.findById(req.body.id)
        .exec(function (err, products) {
            var opts = {
                path: 'productOrder',
                model: 'ProductOrder'
            };

            Order.populate(products, opts, function (ree, products) {
                console.log(JSON.stringify(products));
            });

            res.render('store/cart', {
                title: 'עגלת הקניות שלי',
                angularApp: 'storeApp',
                products: products
            });
        });

*/
    /*Order.find({ _id: req.body.id, userId: req.user._id })
        .populate({
            path: 'productOrder',
            populate: {
                path: 'productOrder',
                model: 'ProductOrder'
            }

        })
        .exec(function (err, productOrder) {
            //products.forEach(function(elem){
                console.log("products = " + JSON.stringify(productOrder));
            //});

            console.log("REQ._ID " + req.body.id);
            res.render('store/cart', {
                title: 'עגלת הקניות שלי',
                angularApp: 'storeApp',
                products: productOrder
            });
        });
*/
};