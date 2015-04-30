angular.module('abacus.services', ['firebase'])
        .factory('Proveedores', function ($firebaseArray) {
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
        });