angular.module('abacus.services', [])
        .factory('AuthService', function ($firebaseAuth, $ionicLoading, $state) {
            return {
                authenticate: function ($rootScope, user) {
                    var _ref = new Firebase($rootScope.BASE_DB_URL);
                    var _auth = $firebaseAuth(_ref);
                    $ionicLoading.show({template: 'Autenticando...'});
                    _auth.$authWithPassword({
                        email: user.email,
                        password: user.password
                    }).then(function (authData) {
                        _ref.child("users").child(authData.uid).once('value', function (snapshot) {
                            $rootScope.currentUser = snapshot.val();
                            $ionicLoading.hide();
                            $state.transitionTo("app.propiedades");
                        });
                    }).catch(function (error) {
                        $ionicLoading.hide();
                        alert("Falló la autenticación:" + error.message);
                    });
                },
                createUser: function ($rootScope, pUser) {
                    var _ref = new Firebase($rootScope.BASE_DB_URL);
                    var _auth = $firebaseAuth(_ref);
                    $ionicLoading.show({template: 'Registrando...'});
                    _auth.$createUser({
                        email: pUser.email,
                        password: pUser.password
                    }).then(function (authData) {
                        alert("Usuario creado satisfactoriamente!");
                        _ref.child("users").child(authData.uid).set({
                            email: pUser.email,
                            nombre: pUser.nombre
                        });
                        $rootScope.currentUser = pUser;
                        $ionicLoading.hide();
                        $state.transitionTo("app.propiedades");
                    }).catch(function (error) {
                        $ionicLoading.hide();
                        alert("Falló la creación delusuario:" + error.message);
                    });
                },
                logout: function ($rootScope) {
                    alert("A");
                    var _ref = new Firebase($rootScope.BASE_DB_URL);
                    var _auth = $firebaseAuth(_ref);
                    $ionicLoading.show({template: 'Deslogueando...'});
                    if($rootScope) {
                        $rootScope.currentUser = {};
                    }
                    _auth.$unauth();
                }
            };
        }
        )
        .factory('ProveedorFB', function ($rootScope, $firebaseArray) {
            var refProveedores = new Firebase($rootScope.BASE_DB_URL + "/proveedores");
            var proveedores = $firebaseArray(refProveedores);

            return {
                all: function () {
                    return proveedores;
                },
                new : function (proveedor) {
                    proveedores.$add(proveedor);
                },
                remove: function (proveedor) {
                    proveedores.$remove(proveedor);
                },
                get: function (proveedorTelefono) {
                    for (var i = 0; i < proveedores.length; i++) {
                        if (proveedores[i].telefono === proveedorTelefono) {
                            return proveedores[i];
                        }
                    }
                    return null;
                }
            };
        })
        .factory('Proveedor', function ($rootScope, $http, $ionicLoading, $window) {
            var request = {
                method: 'GET',
                params: {key: $rootScope.REST_API.KEY}
            };
            return {
                all: function ($scope) {
                    request.url = $rootScope.REST_API.BASE_URL + "/rest_proveedores.json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.proveedores = data.proveedores;
                    });
                },
                new : function ($scope, proveedor) {
                    request.method = 'POST';
                    request.url = $rootScope.REST_API.BASE_URL + "/rest_proveedores.json";
                    request.data = proveedor;
                    $http(request).success(function (data) {
                        $scope.closeNewProveedor();
                        $window.location.reload();
                    });
                },
                remove: function ($scope, proveedorId) {
                    request.method = 'DELETE';
                    request.url = $rootScope.REST_API.BASE_URL + "/rest_proveedores/" + proveedorId + ".json";
                    $http(request).success(function (data) {
                        $window.location.reload();
                    });
                },
                get: function ($scope, proveedorId) {
                    request.url = $rootScope.REST_API.BASE_URL + "/rest_proveedores/" + proveedorId + ".json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.proveedor = data.proveedor;
                    });
                }
            };
        })
        .factory('Propiedad', function ($rootScope, $http, $ionicLoading, $location) {
            var request = {
                method: 'GET',
                params: {key: $rootScope.REST_API.KEY}
            };
            return {
                all: function ($scope) {
                    request.url = $rootScope.REST_API.BASE_URL + "/rest_propiedades.json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.propiedades = data.propiedades;
                    });
                },
                new : function (proveedor) {
                    //proveedores.$add(proveedor);
                },
                remove: function (propiedadId) {
                    request.method = 'DELETE';
                    request.url = $rootScope.REST_API.BASE_URL + "/rest_propiedades/" + propiedadId + ".json";
                    $http(request).success(function (data) {
                        $location.reload();
                    });
                    //proveedores.$remove(proveedor);
                },
                get: function ($scope, propiedadId) {
                    request.url = $rootScope.REST_API.BASE_URL + "/rest_propiedades/" + propiedadId + ".json";
                    $ionicLoading.show({template: 'Cargando...'});
                    $http(request).success(function (data) {
                        $ionicLoading.hide();
                        $scope.propiedad = data.propiedad;
                    });
                },
                addGasto: function (propiedadId, gasto) {
                    // TODO:
                }
            };
        });