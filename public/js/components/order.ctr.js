(function() {

    'use strict';

    angular
        .module('storeApp')
        .controller('orderCtrl', function ($rootScope, productFactory, storeFactory) {

            $scope.showDetails = function(id) {
                console.log(id)
            }

        })
})();