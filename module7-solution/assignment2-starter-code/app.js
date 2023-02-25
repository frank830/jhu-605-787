(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('myCurrency', MyCurrencyFilter);
    
    // LIST #1 - controller
    ShoppingListController1.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListController1(ShoppingListCheckOffService) {
      var ToBuyController = this;
    

      ToBuyController.items = ShoppingListCheckOffService.getToBuyitems();
    
      ToBuyController.displayEmptyMessage = function () {
        return ToBuyController.items.length <= 0? true : false;
      }
    
      ToBuyController.removeItem = function (itemIndex) {
        ShoppingListCheckOffService.removeItem(itemIndex);
      };
    }
    
    
    // LIST #2 - controller
    ShoppingListController2.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListController2(ShoppingListCheckOffService) {
      var AlreadyBoughtController = this;
    
      AlreadyBoughtController.items = ShoppingListCheckOffService.getBoughtItems();
    
      AlreadyBoughtController.displayEmptyMessage = function () {
        return AlreadyBoughtController.items.length <= 0? true : false;
      }

      AlreadyBoughtController.calculateTotal = function (quantity, price) {
        return ShoppingListCheckOffService.calculateTotal(quantity, price);
      }

    }

    function MyCurrencyFilter() {
        return function (totalPrice) {
          var res = "$$$" + totalPrice;
          return res;
        };
    }
    
    
    function ShoppingListCheckOffService() {
      var service = this;
    
      // List of shopping items
      var toBuyitems = [
        {
            "name": "Ice cream",
            "quantity": 5,
            "pricePerItem": 6
        },
        {
            "name": "Cookies",
            "quantity": 10,
            "pricePerItem": 2
        },
        {
            "name": "Chocolate",
            "quantity": 2,
            "pricePerItem": 3
        },
        {
            "name": "Candies",
            "quantity": 3,
            "pricePerItem": 2
        },
        {
            "name": "Chips",
            "quantity": 8,
            "pricePerItem": 8
        },
      ]
      var boughtItems = []
    
      service.removeItem = function (itemIndex) {
        boughtItems.push(toBuyitems[itemIndex])
        toBuyitems.splice(itemIndex, 1);
      };
    
      service.getToBuyitems = function () {
        return toBuyitems;
      };

      service.getBoughtItems = function () {
        return boughtItems;
      };

      service.calculateTotal = function (quantity, price) {
        var total = quantity * price;
        total = total.toFixed(2);
        return total;
      };
    }
    
    })();
    