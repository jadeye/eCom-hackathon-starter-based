(function() {

    "use strict";

    angular
        .module("storeApp")
        .factory("storeFactory", function ($rootScope, $http, $location) {

        var singleProduct = {
            productSku : '',
            saveSku: function() {
                sessionStorage.productSku = angular.toJson(singleProduct.productSku);
            },
            getSku: function() {
                singleProduct.productSku = angular.fromJson(sessionStorage.productSku);
                return singleProduct.productSku;
            }
        }

        $rootScope.$on("saveSku", singleProduct.saveSku);
        $rootScope.$on("getSku", singleProduct.getSku);


        var products;
        // create shopping cart
        var myCart = new shoppingCart("Store");

        // enable PayPal checkout
        // note: the second parameter identifies the merchant; in order to use the
        // shopping cart with PayPal, you have to create a merchant account with
        // PayPal. You can do that here:
        // https://www.paypal.com/webapps/mpp/merchant
        //myCart.addCheckoutParameters("PayPal", "jud_Merch@buy.com");
        myCart.addCheckoutParameters("PayPal", "judm@gmail.com");

        // enable Google Wallet checkout
        // note: the second parameter identifies the merchant; in order to use the
        // shopping cart with Google Wallet, you have to create a merchant account with
        // Google. You can do that here:
        // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
        myCart.addCheckoutParameters("Google", "xxxxxxx",
            {
                ship_method_name_1: "UPS Next Day Air",
                ship_method_price_1: "20.00",
                ship_method_currency_1: "USD",
                ship_method_name_2: "UPS Ground",
                ship_method_price_2: "15.00",
                ship_method_currency_2: "USD"
            }
        );

        function getProducts() {
            //return $http.get('http://localhost:3000/api/products')
            return $http.get($location.protocol() + '://'+ $location.host() + ':' + $location.port() + '/api/products')
            /*if ($location.port) {
                return $http.get($location.protocol() + '://'+ $location.host() + ':' + $location.port() + '/api/products')
            }
            return $http.get($location.protocol() + '://'+ $location.host() + '/api/products')*/
        }

        return {
            getProducts: getProducts,
            cart: myCart,
            singleProduct: singleProduct
        };
    });
})();