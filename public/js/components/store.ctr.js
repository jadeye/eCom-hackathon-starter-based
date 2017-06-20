(function() {

    'use strict';

    angular
        .module("storeApp")
        .controller("storeCtrl", function($rootScope, $scope, $http, storeFactory) {

            var products;

            storeFactory.getProducts().then(function(_products) {
                products = _products.data;
                $rootScope.products = products;
                //console.log(products);
            });

            $rootScope.sku = function(value) {
                storeFactory.singleProduct.productSku = value;
                storeFactory.singleProduct.saveSku();
                //$rootScope.productSku = value;
//                console.log("rootScope.productSku " + $rootScope.productSku);
            };

            $rootScope.cart = storeFactory.cart;

            /*insertOrder = function() {
                console.log("Cart CTRL");
            }*/

        });

})();