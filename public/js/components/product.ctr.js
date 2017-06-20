(function() {

    'use strict';

    angular
        .module('storeApp')
        .controller('productCtrl', function ($rootScope, productFactory, storeFactory) {

            $rootScope.dvaCaption = [
                "זניח",
                "נמוך",
                "ממוצע",
                "טוב",
                "מעולה"
            ];
            $rootScope.dvaRange = [
                "מתחת ל 5%",
                "בין 5 ל 10%",
                "בין 10 ל 20%",
                "בין 20 ל 40%",
                "מעל 40%"
            ];

            $rootScope.cart = storeFactory.cart;

            var sp = storeFactory.singleProduct.getSku();
            //console.log("Product CTRL : " + sp);

            productFactory.getProduct(sp).then(function (product) {
                $rootScope.product = product.data;
                //console.log("Product Ctrl getProduct : " + product.data);
            });
        })
})();