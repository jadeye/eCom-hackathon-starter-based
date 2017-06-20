var Product = require('../../models/Product');
var router = require('express').Router();
/*
 * Get all product for shop
 */
router.get('/', function(req, res, next) {
    console.log("products API Ctrl1")
    Product.find({}, function(err, products) {
        if (err) {
            console.log(err);
            return next(err);
        }
        else {
            //console.log("Pees1 products API Ctrl= " + products);
            return res.json(products)
        }
        next()
    });
});

/*
 * Get product by SKU for product details
 */
router.get('/:sku', function(req, res, next) {
    var q = req.params.sku;
    console.log("products API Ctrl2 " + q)

    Product.findOne({sku : q}, function(err, product) {
        if (err) {
            console.log(err);
            return next(err);
        }
        else {
            console.log("Pees2 products API Ctrl2 = " + product);
            return res.json(product)
        }
        next()
    });
});

module.exports = router