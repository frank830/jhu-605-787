(function () {
    'use strict';
    
    angular.module('public')
    .service("MenuDataService", MenuDataService);
    
    MenuDataService.$inject = ['$http'];
    function MenuDataService($http){
        var service = this;
        
        // service.user = {};

        service.getMenuItem = function(menuNumber){
          var response = $http({
            method: "GET",
            url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
          }).then(function(response){
              var all_menu_items = response.data;
              // process result and only keep items that match
              var foundItem = {};
              for(var shortName in all_menu_items){
                  for(var menuItem in all_menu_items[shortName].menu_items){
                      if(all_menu_items[shortName].menu_items[menuItem].short_name.toLowerCase() == menuNumber.toLowerCase()){
                          // description matches the searchTerm
                          foundItem = all_menu_items[shortName].menu_items[menuItem];
                      }
                  }
              }
              // return processed items
              return foundItem;
          }).catch(function(error) {
              console.log("something went wrong");
          });
          return response;
        }

        service.getRegistrationInfo = function(){
            return service.user;
        }

        service.setRegistrationInfo = function(user){
            service.user = user;
        }
    };
    
    })();
    