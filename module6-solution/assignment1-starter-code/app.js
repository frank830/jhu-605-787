(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.itemNum = ""
  $scope.stateOfBeing = ""

  $scope.checkIfTooMuch = function () {
    if($scope.itemNum.length == 0){
      $scope.stateOfBeing = "Please enter data first"
    }else{
      var splitedList = $scope.itemNum.split(",")
      var totalItems = 0
      for (let item of splitedList){
        console.log(item.trim());
        if(item.trim() !== ''){
          totalItems += 1
        }
      }
      $scope.stateOfBeing = totalItems <= 3 ? "Enjoy!" : "Too much!";
    }
  };
}

})();
