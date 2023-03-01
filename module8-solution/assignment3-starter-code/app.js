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
                onRemove: '&',
                message: '<'
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
        narrow.msg = "";

        narrow.narrowDown = function(){
            var noSpaceStr = narrow.searchTerm.trim();
            if(noSpaceStr.length > 0){
                var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm.toLowerCase());

                promise.then(function (response) {
                    narrow.found = response;
                    narrow.msg = narrow.found.length <= 0? "Nothing found": "";
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
            }else{
                narrow.found = [];
                narrow.msg = "Nothing found";
            }
        }

        narrow.removeItem = function (itemIndex) {
            narrow.found.splice(itemIndex, 1);
        };

    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
      var service = this;

      service.getMatchedMenuItems = function (searchTerm) {
        var response = $http({
          method: "GET",
          url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
        }).then(function(response){
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
    