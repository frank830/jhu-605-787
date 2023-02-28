(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
            },
            controller: NarrowItDownController,
            controllerAs: 'narrow',
            bindToController: true
        };

        return ddo;
    }
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrow = this;

        narrow.searchTerm = "";
        narrow.found = [];

        narrow.narrowDown = function(){
            var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

            promise.then(function (response) {
                narrow.found = response;
                console.log(narrow.found)
            })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        }

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
    