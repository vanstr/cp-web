angular.module('cpWebApp')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $location) {

        $scope.ok = function () {
            $modalInstance.close($scope.newPlayList.name);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            $location.path("/player");
        };
    });