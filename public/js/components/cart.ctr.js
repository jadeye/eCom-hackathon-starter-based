(function() {

    'use strict';

    angular
        .module('storeApp')
        .controller('cartCtrl', function($rootScope, cartFactory, storeFactory) {

            $rootScope.cart = storeFactory.cart;

            /*if (products)
                $rootScope.are = true;*/

            $rootScope.insertOrder = function (service) {
                console.log("Cart CTRL " + $rootScope.cart.cartName);
                //var items = storeFactory.cart.getItems();
                /*
                 * todo: check if cart.getItems is neede
                 */
                var items = storeFactory.cart.items;
                var total = storeFactory.cart.getTotalPrice();
                cartFactory.saveOrder(items, total, service);
            };


/*
            $rootScope.insertOrder = function() {
                console.log("Cart CTRL " + $rootScope.cart.cartName);
                var items = localStorage != null ? localStorage[$rootScope.cart.cartName + "_items"] : null;
                console.log(items);
                if (items != null && JSON != null) {
                    try {
                        var items = JSON.parse(items);
                        console.log(items.length);
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
                                console.log("Gettin ITEM " + item.name);
                                item = new cartItem(item.sku, item.name, item.price, item.quantity);
                                this.items.push(item);
                            }
                        }
                    }
                    catch (err) {
                        // ignore errors while loading...
                    }
                }

            };
*/



                    /*var xsrfToken = $cookies.get($http.defaults.xsrfCookieName);
                    console.log("CARToken: " + xsrfToken);
                    //var csrfToken = $http.defaults.headers.post[$http.defaults.xsrfHeaderName];
                    if (xsrfToken) {
                        cartFactory.saveOrder(items, total, xsrfToken).then( function(res) {
                            console.log(res);
                            $location.redirect('/profile');
                        });
                    } else {
                        console.log("CART NO CooKIE");
                    }*/


/*
            productFactory.getProduct(sp).then(function (product) {
                $rootScope.product = product.data;
            });
*/

            /*$rootScope.cart.insertOrder = function() {
                console.log("Cart CTRL");
                /*var items = localStorage != null ? localStorage[$rootScope.cart.cartName + "_items"] : null;
                if (items != null && JSON != null) {
                    try {
                        var items = JSON.parse(items);
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
                                console.log("Gettin ITEM " + item.name);
                                item = new cartItem(item.sku, item.name, item.price, item.quantity);
                                this.items.push(item);
                            }
                        }
                    }
                    catch (err) {
                        // ignore errors while loading...
                    }
                }
            }*/
            //$httpProvider.defaults.xsrfCookieName = "_csrf";
            //console.log("Cookie CartCtrl " + $httpProvider.defaults.xsrfCookieName);
            //$rootScope.csrf = csrfToken
            //console.log(storeFactory.cart.loadItems())
            //$rootScope.cart.items = storeFactory.cart.loadItems();

    });

})();