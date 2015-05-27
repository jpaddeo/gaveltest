angular.module('abacus', ['ionic', 'abacus.controllers', 'abacus.services'])
        .constant("GLOBAL_CONFIG", {
            DB_PATH: 'https://jpa.firebaseio.com/abacus',
            GEO: {
                DEFAULT_CONFIG: {
                    ZOOM: '6',
                    POSITION: '27.8333,-81.7170'
                }
            },
            REST_API: {
                KEY: '890d68ad1ef38782d8f92ac77fb4862cc5c013ae',
                BASE_URL: 'http://www.gaveltest.com.ar'
            },
            SOC: 'abacus'
        })
        .run(function ($ionicPlatform, $rootScope, AuthServiceRest) {
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
                $rootScope.currentUser = null;
                $rootScope.desloguear = function () {
                    AuthServiceRest.desloguear($rootScope);
                };
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
                        }
                    })
                    .state('app.proveedor', {
                        url: "/proveedores/:proveedorId",
                        views: {
                            'tab-proveedores': {
                                templateUrl: "templates/proveedor.html",
                                controller: 'ProveedorCtrl'
                            }
                        }
                    })
                    .state('app.propiedades', {
                        url: "/propiedades",
                        views: {
                            'tab-propiedades': {
                                templateUrl: "templates/tab-propiedades.html",
                                controller: 'PropiedadesCtrl'
                            }
                        }
                    })
                    .state('app.propiedad', {
                        url: "/propiedades/:propiedadId",
                        views: {
                            'tab-propiedades': {
                                templateUrl: "templates/propiedad.html",
                                controller: 'PropiedadCtrl'
                            }
                        }
                    })
                    .state('app.mapa', {
                        url: "/mapa",
                        views: {
                            'tab-mapa': {
                                templateUrl: "templates/tab-mapa.html",
                                controller: 'MapaCtrl'
                            }
                        }
                    })
                    .state('app.relevamiento', {
                        url: "/relevamiento",
                        views: {
                            'tab-relevamiento': {
                                templateUrl: "templates/tab-relevamiento.html",
                                controller: 'RelevamientoCtrl'
                            }
                        }
                    })
                    .state('app.mensajes', {
                        url: "/mensajes",
                        views: {
                            'tab-mensajes': {
                                templateUrl: "templates/tab-mensajes.html",
                                controller: 'MensajesCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/login');
        });
