var BASE_DB_URL = "https://jpa.firebaseio.com/abacus";
var REST_API = {BASE_URL: 'http://auctions', KEY: '890d68ad1ef38782d8f92ac77fb4862cc5c013ae'};

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
        .config(function ($compileProvider, $stateProvider, $urlRouterProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|geo|tel):/);
            $stateProvider
                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "templates/menu.html",
                        controller: 'AppCtrl'
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
                    })
                    .state('app.propiedades', {
                        url: "/propiedades",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/propiedades.html",
                                controller: 'PropiedadesCtrl'
                            }
                        }
                    })
                    .state('app.propiedad', {
                        url: "/propiedades/:propiedadId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/propiedad.html",
                                controller: 'PropiedadCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/propiedades');
        });
