angular.module('abacus.controllers', ['firebase'])
        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        })
        .controller('ProveedoresCtrl', function ($scope, $ionicModal, Proveedor) {
            Proveedor.all($scope);
    
            $scope.removeProveedor = function (proveedor) {
                Proveedor.remove($scope, proveedor);
            };
            // Modal de Nuevo Proveedor
            $scope.nuevoProveedorData = {};
            $ionicModal.fromTemplateUrl('templates/dialogs/new_proveedor.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.closeNewProveedor = function () {
                $scope.modal.hide();
            };
            $scope.showNewProveedor = function () {
                $scope.nuevoProveedorData = {};
                $scope.modal.show();
            };
            $scope.addProveedor = function () {
                Proveedor.new($scope, $scope.nuevoProveedorData);
                $scope.closeNewProveedor();
            };
        })
        .controller('ProveedorCtrl', function ($scope, $stateParams) {
            $scope.nombre = $stateParams.provedorNombre;
        })
        .controller('PropiedadesCtrl', function ($scope, Propiedad) {
            Propiedad.all($scope);
            $scope.reloadPropiedades = function () {
                Propiedad.all($scope);
            };
            $scope.removePropiedad = function (propiedadId) {
                Propiedad.remove(propiedadId);
            };
        })
        .controller('PropiedadCtrl', function ($scope, $stateParams, $ionicModal, Propiedad) {
            Propiedad.get($scope, $stateParams.propiedadId);

            // Modal de Nuevo Proveedor
            $scope.nuevoGastoData = {};
            $ionicModal.fromTemplateUrl('templates/dialogs/new_gasto.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.closeNewGastoDialog = function () {
                $scope.modal.hide();
            };
            $scope.showNewGastoDialog = function () {
                $scope.nuevoGastoData = {};
                $scope.modal.show();
            };
            $scope.addGasto = function () {
                Propiedad.addGasto($scope.propiedad.Propiedad.id, $scope.nuevoGastoData);
                $scope.closeNewGastoDialog();
            };
        });