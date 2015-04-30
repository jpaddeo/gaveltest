var BASE_DB_URL = "https://jpa.firebaseio.com/abacus";

angular.module('abacus', ['ionic', 'abacus.controllers', 'abacus.services'])
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "templates/menu.html",
                        controller: 'AppCtrl'
                    })

                    .state('app.search', {
                        url: "/search",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/search.html"
                            }
                        }
                    })

                    .state('app.browse', {
                        url: "/browse",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/browse.html"
                            }
                        }
                    })
                    .state('app.proveedores', {
                        url: "/proveedores",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/proveedores.html",
                                controller: 'ProveedoresCtrl'
                            }
                        }
                    })
                    .state('app.proveedor', {
                        url: "/proveedores/:provedorNombre",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/proveedor.html",
                                controller: 'ProveedorCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/proveedores');
        });
