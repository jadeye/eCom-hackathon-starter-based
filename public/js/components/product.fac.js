(function() {

    "use strict";

    angular
        .module("storeApp")
        .factory("productFactory", function ($http) {

            function getProduct(sku) {
                //return $http.get($location.protocol() + '://' + $location.host() + ':' + $location.port() + '/api/products/' + sku);
                return $http.get('/api/products/' + sku);
            }

            return {
                getProduct: getProduct
            }
        });
})();