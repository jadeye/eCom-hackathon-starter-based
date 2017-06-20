const passport = require('../config/passport');
const Order = require('../models/Order');

var userId;
/**
 * GET /orders
 * Orders page.
 */
exports.getOrders = (req, res) => {

    //var orders;
    if (passport.isAuthenticated) {
        //console.log((passport.isAuthenticated).toString());
        console.log(req.user._id);
        userId = req.user._id;
    }

    Order.find({ userId: req.user._id })
        .populate('orders')
        .lean()
        .exec(function (err, orders) {
            orders.forEach(function(elem){
                //console.log("ELEM = " + elem + " " + elem.productOrder[0]);
                console.log("ELEM = " + typeof elem.productOrder + " " + req.user._id);
            });

            res.render('account/orders', {
                title: 'ניהול ההזמנות שלי',
                angularApp: 'storeApp',
                orders: orders
            });
        });
 };