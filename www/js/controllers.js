angular.module('abacus.controllers', ['firebase'])
        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
            // Form data for the login modal
            $scope.loginData = {};
            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };
            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };
            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);
                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
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
