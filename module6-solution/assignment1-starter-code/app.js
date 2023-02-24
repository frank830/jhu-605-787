(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.itemNum = 0;
  $scope.stateOfBeing = ""

  $scope.checkIfTooMuch = function () {
    $scope.stateOfBeing = $scope.itemNum <= 3 ? "Enjoy!" : "Too much!";
  };
}

})();
