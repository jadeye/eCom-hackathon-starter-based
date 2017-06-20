//var storeApp = angular.module('storeApp', [])
var storeApp = angular.module('storeApp', ['ui.router', 'ngRoute', 'ngResource', 'ngCookies'])
        .config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {

            //$locationProvider.html5Mode(true);
            /*$locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });*/
            $stateProvider
                .state('store', {
                    url: '/store',
                    templateUrl: 'store/store',
                    controller: 'storeCtrl'
                })
                .state('products', {
                    url: '/products/:productSku',
                    templateUrl: 'store/product',
                    controller: 'productCtrl'
                })
                .state('product', {
                    url: '/product',
                    templateUrl: 'store/product',
                    controller: 'productCtrl'
                })
                .state('orders', {
                    url: '/api/orders',
                    controller: 'cartCtrl'
                })
                .state('carts', {
                    url: 'account/carts',
                    controller: 'cartCtrl',
                    resolve: {
                        'products': function () {
                            localStorage["Store_items"] = JSON.stringify(products);
                            $window.localStorage.setItem(JSON.stringify(products));
                            console.log("Products");
                        }
                    }
                })
                .state('cart', {
                    url: 'store/cart',
                    controller: 'cartCtrl',
                    resolve: {
                        'products': function() {
                            localStorage["Store_items"] = JSON.stringify(products);
                            $window.localStorage.setItem(JSON.stringify(products));
                            console.log("Products");
                        }
                    }
                })
                .state("otherwise", {
                    url : '/store',
                    templateUrl: 'store/store',
                    controller: 'storeCtrl'
                });
        }])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.xsrfCookieName = "XSRF-TOKEN";
            $httpProvider.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

            /*var xsrfToken = $cookiesProvider.get($httpProvider.defaults.xsrfCookieName);
            if (xsrfToken) {
                $httpProvider.defaults.headers[$httpProvider.defaults.xsrfHeaderName] = xsrfToken;
                $httpProvider.defaults.headers.post['X-CSRF-TOKEN'] = $cookiesProvider.$get()["XSRF-TOKEN"];
            }*/
        }])
        .run(function($rootScope, $route, $state, $window, $location, $http, $cookies) {

            //$http.defaults.headers.post['XSRF-TOKEN'] = $cookies.get('XSRF-TOKEN');

            var xsrfToken = $cookies.get($http.defaults.xsrfCookieName);
            if (xsrfToken) {
                $http.defaults.headers.post[$http.defaults.xsrfHeaderName] = xsrfToken;
                //$http.defaults.headers.post[$http.defaults.xsrfCookieName] = xsrfToken;
                //$http.defaults.headers[$http.defaults.headers.post] = xsrfToken;
                console.log("Name: " + $http.defaults.xsrfHeaderName + ", Token: " + xsrfToken);
                //$http.defaults.headers['X-Access-Token'] = $window.sessionStorage.token;
                //console.log(config.headers['X-Access-Token']);
                //$http.defaults.headers.post['X-CSRF-TOKEN'] = $cookies.$get()["XSRF-TOKEN"];
            } else {
                console.log("No cookie")
            }
            // set the CSRF token here
            //$http.defaults.headers.post['X-CSRF-TOKEN'] = $cookies.csrftoken;
            //$http.defaults.headers.post['X-CSRF-TOKEN'] = $cookiesProvider.$get()["XSRF-TOKEN"];

            /*$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams)
            {
                console.log("State changed");
                if (toState.name === $rootScope.previousState )
                {
                    // u can any 1 or all of below 3 statements
                    //event.preventDefault();  // to Disable the event
                    //$state.go('someDefaultState'); //As some popular banking sites are using
                    alert("Back button Clicked");

                }
                else
                    $rootScope.previousState= fromState.name;
            });*/

            /*
             * todo implement BACk of browser to reload previous order into CART
             * if not fulfilled
             */
            $rootScope.$on('$locationChangeSuccess', function() {
                $rootScope.actualLocation = $location.absUrl();
                console.log("actualLocation " + $rootScope.actualLocation);
            });

            $rootScope.$watch(function () {return $location.absUrl()}, function (newLocation, oldLocation) {

                //true only for onPopState
                if ($rootScope.actualLocation === newLocation) {

                    var back,
                        historyState = $window.history.state;

                    back = !!(historyState && historyState.position <= $rootScope.stackPosition);

                    if (back) {
                        //back button
                        $rootScope.stackPosition--;
                        console.log("$rootScope.stackPosition - " + $rootScope.stackPosition);
                    } else {
                        //forward button
                        $rootScope.stackPosition++;
                    }

                } else {
                    //normal-way change of page (via link click)
                    console.log("NORMAL WAY " + $state.current);
                    if ($location.absUrl) {
                        console.log("Route current " + $location.absUrl());
                        $window.history.replaceState({
                            position: $rootScope.stackPosition
                        },'');
                        // console.log($window.history.state);
                        $rootScope.stackPosition++;

                    }

                }
            });

            /*$rootScope.$watch(function () {return $location.absUrl()}, function (newLocation, oldLocation) {
                console.log("CANGHED URL " + newLocation + " " + oldLocation);
                if(newLocation === oldLocation) {
                    alert('Why did you use history back?');
                }
            });*/
        });