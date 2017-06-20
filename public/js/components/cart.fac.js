(function() {

    "use strict";

    angular
        .module("storeApp")
        .factory("cartFactory", function ($http, $httpParamSerializer) {

            function saveOrder(items, total, service) {
                //return $http.post($location.protocol() + '://'+ $location.host() + ':' + $location.port() + '/api/orders')
                $http({
                    url: '/api/orders',
                    method: "POST",
                    data: {
                        'items': items,
                        'total': total,
                        'service': service
                    }
                })
                .then(function(response) {
                    console.log("Cart FAC Res: " +response);
                        // success
                },
                function(response) { // optional
                        // failed
                });
            }

            return {
                saveOrder: saveOrder
            };
        });
})();