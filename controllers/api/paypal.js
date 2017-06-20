var router = require('express').Router();

router.get('/', function(req, res, next) {
    var tx = req.param('tx');
    var st = req.param('st');
    var amt = req.param('amt');
    var cc = req.param('cc');
    var cm = req.param('cm');
    var item_number = req.param('item_number');
    var userId =  req.user._id;
    console.log("PP GET success " + tx + " UId: " + userId);

    res.redirect('/store');

    /*tx=9P775149BB7805521
    st=Completed
    amt=32%2e00
    cc=ILS
    cm=
    item_number=*/

    /*
     https://developer.paypal.com/docs/classic/paypal-payments-standard/integration-guide/paymentdatatransfer/
    <form method=post action="https://www.paypal.com/cgi-bin/webscr">
        <input type="hidden" name="cmd" value="_notify-synch">
        <input type="hidden" name="tx" value="TransactionID">
        <input type="hidden" name="at" value="YourIdentityToken">
        <input type="submit" value="PDT">
    </form>*/

    /*Product.find({}, function(err, products) {
        if (err) {
            console.log(err);
            return next(err);
        }
        else {
            //console.log("Pees1 products API Ctrl= " + products);
            return res.json(products)
        }
        next()
    });*/
});
router.post('/', function(req, res, next) {
    console.log("PP POST success " + req.data.tx);
    //res.redirect('/store');
});
/*
router.get('/cancel', function(req, res, next) {
    var q = req.params.sku;
    //console.log("products API Ctrl2 " + q)

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
*/

module.exports = router