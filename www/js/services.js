angular.module('abacus.services', [])
        .factory('AuthServiceRest', function ($http, $ionicLoading, $state, GLOBAL_CONFIG) {
            return {
                autenticar: function ($rootScope, user) {
                    var request = {
                        method: 'POST',
                        params: {key: GLOBAL_CONFIG.REST_API.KEY},
                        data: {username: user.username, password: user.password}
                    };
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_users/validar";
                    $ionicLoading.show({template: 'Autenticando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        if (data.error) {
                            alert("Falló la autenticación:" + data.error);
                        } else {
                            if (data.usuario) {
                                $rootScope.currentUser = data.usuario;
                                $state.transitionTo("app.propiedades");
                            }
                        }
                    });
                },
                desloguear: function ($rootScope) {
                    $ionicLoading.show({template: 'Deslogueando...'});
                    if ($rootScope) {
                        $rootScope.currentUser = null;
                    }
                    $ionicLoading.hide();
                    $state.transitionTo("app.login");
                }
            };
        })
        .factory('Proveedor', function ($http, $ionicLoading, GLOBAL_CONFIG) {
            var request = {
                method: 'GET',
                params: {key: GLOBAL_CONFIG.REST_API.KEY}
            };
            return {
                all: function ($scope) {
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_proveedores.json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.proveedores = data.proveedores;
                    });
                },
                new : function (proveedor) {
                    request.method = 'POST';
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_proveedores.json";
                    request.data = proveedor;
                    $http(request).success(function (data) {
                        return true;
                    });
                },
                remove: function (proveedorId) {
                    request.method = 'DELETE';
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_proveedores/" + proveedorId + ".json";
                    $http(request).success(function (data) {
                        return true;
                    });
                },
                get: function ($scope, proveedorId) {
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_proveedores/" + proveedorId + ".json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.proveedor = data.proveedor;
                    });
                }
            };
        })
        .factory('Propiedad', function ($http, $ionicLoading, GLOBAL_CONFIG) {
            var request = {
                method: 'GET',
                params: {key: GLOBAL_CONFIG.REST_API.KEY}
            };
            return {
                all: function ($scope) {
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_propiedades.json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.propiedades = data.propiedades;
                    }).finally(function () {
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                },
                get: function ($scope, propiedadId) {
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_propiedades/" + propiedadId + ".json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.propiedad = data.propiedad;
                    });
                }
            };
        })
        .factory('Gasto', function ($http, $ionicLoading, GLOBAL_CONFIG) {
            var request = {
                method: 'GET',
                params: {key: GLOBAL_CONFIG.REST_API.KEY}
            };
            return {
                all: function ($scope) {
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_gastos.json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.gastos = data.gastos;
                    }).finally(function () {
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                },
                new : function (gasto) {
                    request.method = 'POST';
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_gastos.json";
                    request.data = gasto;
                    $http(request).success(function (data) {
                        return true;
                    });
                },
                remove: function (gastoId) {
                    request.method = 'DELETE';
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_gastos/" + gastoId + ".json";
                    $http(request).success(function (data) {
                        return true;
                    });
                },
                get: function ($scope, gastoId) {
                    request.url = GLOBAL_CONFIG.REST_API.BASE_URL + "/rest_gastos/" + gastoId + ".json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.gasto = data.gasto;
                    });
                }
            };
        })
        .directive('ionSearch', function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    getData: '&source',
                    model: '=?',
                    search: '=?filter'
                },
                link: function (scope, element, attrs) {
                    attrs.minLength = attrs.minLength || 0;
                    scope.placeholder = attrs.placeholder || '';
                    scope.search = {value: ''};

                    if (attrs.class)
                        element.addClass(attrs.class);

                    if (attrs.source) {
                        scope.$watch('search.value', function (newValue, oldValue) {
                            if (newValue.length > attrs.minLength) {
                                scope.getData({str: newValue}).then(function (results) {
                                    scope.model = results;
                                });
                            } else {
                                scope.model = [];
                            }
                        });
                    }

                    scope.clearSearch = function () {
                        scope.search.value = '';
                    };
                },
                template: '<div class="item-input-wrapper">' +
                        '<i class="icon ion-ios-search-strong"></i>' +
                        '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
                        '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                        '</div>'
            };
        });        