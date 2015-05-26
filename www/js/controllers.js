angular.module('abacus.controllers', ['ngMap'])
        .controller('TabsCtrl', function ($scope, $rootScope) {
            $scope.hideClass = 'ng-hide';
            $scope.showClass = 'ng-show';
            $scope.currentUser = function () {
                return !empty($rootScope.currentUser);
            };
        })
        .controller('LoginCtrl', function ($scope, $rootScope, AuthServiceRest) {
            $scope.loginUser = {};
            $scope.loguear = function () {
                if (empty($rootScope.currentUser)) {
                    AuthServiceRest.autenticar($rootScope, $scope.loginUser);
                    $scope.loginUser = {};
                }
            };
        })
        .controller('ProveedoresCtrl', function ($scope, $ionicModal, $state, Proveedor) {
            Proveedor.all($scope);
            $scope.removerProveedor = function (proveedor) {
                if (Proveedor.remove(proveedor)) {
                    console.log("Proveedor removido");
                }
            };
            // Modal de Nuevo Proveedor
            $scope.nuevoProveedorData = {};
            $ionicModal.fromTemplateUrl('templates/dialogs/nuevo_proveedor.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.cerrarDialogoNuevoProveedor = function () {
                $scope.nuevoProveedorData = {};
                $scope.modal.hide();
            };
            $scope.mostrarDialogoNuevoProveedor = function () {
                $scope.nuevoProveedorData = {};
                $scope.modal.show();
            };
            $scope.agregarProveedor = function () {
                Proveedor.new($scope, $scope.nuevoProveedorData);
            };
            $scope.irAProveedor = function (proveedorId) {
                $state.transitionTo("app.proveedor", {proveedorId: proveedorId});
            };
            $scope.recargarProveedores = function () {
                Proveedor.all($scope);
            };
        })
        .controller('ProveedorCtrl', function ($scope, $stateParams, Proveedor) {
            Proveedor.get($scope, $stateParams.proveedorId);
        })
        .controller('PropiedadesCtrl', function ($scope, $state, Propiedad) {
            Propiedad.all($scope);
            $scope.recargarPropiedades = function () {
                Propiedad.all($scope);
            };
            $scope.irAPropiedad = function (propiedadId) {
                $state.transitionTo("app.propiedad", {propiedadId: propiedadId});
            };
        })
        .controller('PropiedadCtrl', function ($scope, $stateParams, $ionicModal, Propiedad, Proveedor, Gasto) {
            Propiedad.get($scope, $stateParams.propiedadId);
            Proveedor.all($scope);
            // Modal de Nuevo Proveedor
            $scope.nuevoGastoData = {};
            $ionicModal.fromTemplateUrl('templates/dialogs/nuevo_gasto.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.cerrarDialogoNuevoGasto = function () {
                $scope.nuevoGastoData = {};
                $scope.modal.hide();
            };
            $scope.mostrarDialogoNuevoGasto = function () {
                $scope.nuevoGastoData = {};
                $scope.modal.show();
            };
            $scope.agregarGasto = function () {
                Gasto.new($scope, $scope.nuevoGastoData);
            };
            $scope.recargarPropiedad = function () {
                Propiedad.get($scope, $scope.propiedad.Propiedad.id);
            };
        })
        .controller('MapaCtrl', function ($scope, $ionicPopup, Propiedad, GLOBAL_CONFIG) {
            $scope.defaultConfig = GLOBAL_CONFIG.GEO.DEFAULT_CONFIG;
            Propiedad.all($scope);
            $scope.$on('mapInitialized', function (event, map) {
                $scope.map = map;
                for (var i in $scope.map.markers) {
                    console.log($scope.map.markers[i].infoWindow);
                }
            });
        })
        .controller('MensajesCtrl', function () {

        });