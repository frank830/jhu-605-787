(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('ListController', ListController)
    .service('MenuSearchService', MenuSearchService);
    // .directive('foundItems', FoundItems);

    // function FoundItems() {
    //     var ddo = {
    //       templateUrl: 'foundItems.html',
    //       scope:{
    //         foundItems: '@foundItems'
    //       }
    //     };
      
    //     return ddo;
    // }
    
    ListController.$inject = ['MenuSearchService'];
    function ListController(MenuSearchService) {
        var list = this;

        list.found = [];

        var promise = MenuSearchService.getMatchedMenuItems();

        promise.then(function (response) {
            list.found = response;
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
      var service = this;

      service.getMatchedMenuItems = function (searchTerm) {
        var response = $http({
          method: "GET",
          url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
        }).then(function(response){
            console.log(response.data)
            var all_menu_items = response.data;

            // process result and only keep items that match
            var foundItems = [];
            for(var shortName in all_menu_items){
                for(var menuItem in all_menu_items[shortName].menu_items){
                    if(all_menu_items[shortName].menu_items[menuItem].description.toLowerCase().indexOf(searchTerm) !== -1 ){
                        // description matches the searchTerm
                        foundItems.push(all_menu_items[shortName].menu_items[menuItem])
                    }
                }
            }

            // return processed items
            return foundItems;
        }).catch(function(error) {
            console.log("something went wrong");
        });
        return response;
      };
    
    }

    })();
    