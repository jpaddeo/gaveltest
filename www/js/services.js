angular.module('abacus.services', ['firebase'])
        .factory('Proveedor', function ($firebaseArray) {
            var refProveedores = new Firebase(BASE_DB_URL + "/proveedores");
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
        .factory('Propiedad', function ($http, $window) {
            var request = {
                method: 'GET',
                params: {key: REST_API.KEY}
            };
            return {
                all: function ($scope) {
                    request.url = REST_API.BASE_URL + ".json";
                    $http(request).success(function (data) {
                        $scope.propiedades = data.propiedades;
                    });
                },
                new : function (proveedor) {
                    //proveedores.$add(proveedor);
                },
                remove: function (propiedadId) {
                    request.method = 'DELETE';
                    request.url = REST_API.BASE_URL + "/" + propiedadId + ".json";
                    $http(request).success(function (data) {
                        console.log(data);
                        $window.location.reload();
                    });
                    //proveedores.$remove(proveedor);
                },
                get: function ($scope, propiedadId) {
                    request.url = REST_API.BASE_URL + "/" + propiedadId + ".json";
                    $http(request).success(function (data) {
                        $scope.propiedad = data.propiedad;
                    });
                },
                addGasto: function (propiedadId, gasto) {
                    // TODO:
                }
            };
        });