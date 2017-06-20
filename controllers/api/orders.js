var Order = require('../../models/Order');
var ProductOrder = require('../../models/ProductOrder');
var PaymentTrans = require('../../models/PaymentTrans');
var ServicePaymentDetails = require('../../models/ServicePaymentDetails');
//var router = require('express').Router();

//router.post('/', function(req, res, next) {
exports.insertItems = (req, res, next) => {
    //var items = JSON.stringify(req.query.items);

    //var items = JSON.parse(req.body.items);
    var items = req.body.items;
    console.log("orderss API POST " + JSON.stringify(items));
    var itemsLen = items.length;
    console.log("itemsLen " + itemsLen);
    var total = req.body.total;
    console.log("orderss API POST " + total);
    var service = req.body.service;
    console.log("orderss API POST " + service);
    //console.log(req.user._id);
    userId = req.user._id;

    var order = new Order({ userId: req.user._id });
    //console.log(JSON.stringify(order));
    var productOrder = new ProductOrder();
    var paymentTrans = new PaymentTrans();
    //var servicePaymentDetails = new ServicePaymentDetails();
    /*for (var i = 0; i < itemsLen; i++) {
     console.log(items[i])
     }*/
    for (var i = 0; i < itemsLen; i++) {
        console.log("itemsLen " + itemsLen);
        var pTotal = items[i].quantity * items[i].price;
        console.log(pTotal);
        items[i]['total'] = pTotal;
        console.log(items[i] + " index " + i + " of " + itemsLen);
        productOrder = items[i];
        console.log(JSON.stringify(productOrder));
        order.productOrder.push(productOrder);
    }
    order.totalPerOrder = total;
    //servicePaymentDetails.name = service;
    //paymentTrans.servicePaymentDetails.push(servicePaymentDetails);
    paymentTrans.serviceName = service;
    order.paymentTrans.push(paymentTrans);
    console.log(JSON.stringify(order));
    /*
     productOrder: {
     sku: {type: String, default: ''},
     name: {type: String, default: ''},
     quantity: {type: Number, default: ''},
     price: {type: Number, default: ''},
     total: {type: Number, default: ''}
     },
     totalPerOrder: {type: Number, default: ''},

     */
    order.save(function (err, items) {
        if (err) {
            console.log(err);
            return next(err);
        }
        else {
            //console.log("Pees1 products API Ctrl= " + products);

            /*
             * todo: update PaymentTrans with orderId & ServicePaymentDetails with orderId and serviceName
             */
            return res.json(items)
        }
       next();
    });
};


/*

router.get('/', function(req, res, next) {
    console.log("orderss API GET " + req.params);

        console.log(req.user._id);
        userId = req.user._id;

        var order = new Order({ userId: req.user._id });
        for (var i = 0, len = req.params.items.length; i < len; i++) {
            console.log(req.params(items[i]));
            order.productOrder.push(req.params(items[i]));
        }
        order.totalPerOrder = req.param('total');
        /!*
            productOrder: {
                sku: {type: String, default: ''},
                name: {type: String, default: ''},
                quantity: {type: Number, default: ''},
                price: {type: Number, default: ''},
                total: {type: Number, default: ''}
            },
            totalPerOrder: {type: Number, default: ''},

*!/
        Order.save({}, function (err, items) {
            if (err) {
                console.log(err);
                return next(err);
            }
            else {
                //console.log("Pees1 products API Ctrl= " + products);
                return res.json(items)
            }
            next();
        });
});
*/

//module.exports = router