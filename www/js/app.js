angular.module('abacus', ['ionic', 'abacus.controllers', 'abacus.services'])
        .run(function ($ionicPlatform, $rootScope, AuthService) {
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

                $rootScope.currentUser = {};
                $rootScope.BASE_DB_URL = "https://jpa.firebaseio.com/abacus";
                $rootScope.REST_API = {BASE_URL: 'http://auctions', KEY: '890d68ad1ef38782d8f92ac77fb4862cc5c013ae'};
            });
        })
        .config(function ($compileProvider, $stateProvider, $urlRouterProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|geo|tel):/);
            $stateProvider
                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "templates/tabs.html",
                        controller: 'TabsCtrl'
                    })
                    .state('app.login', {
                        url: "/login",
                        views: {
                            'tab-login': {
                                templateUrl: "templates/tab-login.html",
                                controller: 'LoginCtrl'
                            }
                        }
                    })
                    .state('app.proveedores', {
                        url: "/proveedores",
                        views: {
                            'tab-proveedores': {
                                templateUrl: "templates/tab-proveedores.html",
                                controller: 'ProveedoresCtrl'
                            }
                        },
                        authRequired: true
                    })
                    .state('app.proveedor', {
                        url: "/proveedores/:provedorNombre",
                        views: {
                            'tab-proveedores': {
                                templateUrl: "templates/proveedor.html",
                                controller: 'ProveedorCtrl'
                            }
                        },
                        authRequired: true
                    })
                    .state('app.propiedades', {
                        url: "/propiedades",
                        views: {
                            'tab-propiedades': {
                                templateUrl: "templates/tab-propiedades.html",
                                controller: 'PropiedadesCtrl'
                            }
                        },
                        authRequired: true
                    })
                    .state('app.propiedad', {
                        url: "/propiedades/:propiedadId",
                        views: {
                            'tab-propiedades': {
                                templateUrl: "templates/propiedad.html",
                                controller: 'PropiedadCtrl'
                            }
                        },
                        authRequired: true
                    })
                    .state('app.mensajes', {
                        url: "/mensajes",
                        views: {
                            'tab-mensajes': {
                                templateUrl: "templates/tab-mensajes.html",
                                controller: 'MensajesCtrl'
                            }
                        },
                        authRequired: true
                    })
                    .state('app.logout', {
                        url: "/logout",
                        abstract: true,
                        authRequired: true,
                        controller: function ($rootScope, AuthService) {
                            AuthService.logout($rootScope);
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/login');
        });
