(function () {
    'use strict';
    
    angular.module('data')
    .service("MenuDataService", MenuDataService);
    
    MenuDataService.$inject = ['$http'];
    function MenuDataService($http){
        var service = this;

        service.getAllCategories = function () {
          var response = $http({
            method: "GET",
            url: ("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json")
          }).then(function(response){
              return response.data;
          }).catch(function(error) {
              console.log("getAllCategories went wrong");
          });
          console.log(response)
          return response;
        };

        service.getItemsForCategory = function (categoryShortName){
            var response = $http({
                method: "GET",
                url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + categoryShortName + ".json")
              }).then(function(response){
                  return response.data;
              }).catch(function(error) {
                  console.log("getItemsForCategory went wrong");
              });
              return response; 
        };
    };
    
    })();
    