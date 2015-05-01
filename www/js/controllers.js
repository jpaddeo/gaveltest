angular.module('abacus.controllers', ['firebase'])
        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
            $scope.loginData = {};
            $scope.userLogged = false;
            $ionicModal.fromTemplateUrl('templates/dialogs/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };
            $scope.login = function () {
                $scope.modal.show();
            };
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);
                $timeout(function () {
                    $scope.userLogged = true;
                    $scope.closeLogin();
                }, 1000);
            };
        })
        .controller('ProveedoresCtrl', function ($scope, $ionicModal, Proveedores) {
            $scope.proveedores = Proveedores.all();
            $scope.removeProveedor = function (proveedor) {
                Proveedores.remove(proveedor);
            };
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
                Proveedores.new($scope.nuevoProveedorData);
                $scope.closeNewProveedor();
            };
        })
        .controller('ProveedorCtrl', function ($scope, $stateParams) {
            $scope.nombre = $stateParams.provedorNombre;
        });
