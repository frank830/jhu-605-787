(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    // LIST #1 - controller
    ShoppingListController1.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListController1(ShoppingListCheckOffService) {
      var ToBuyController = this;
    

      ToBuyController.items = ShoppingListCheckOffService.getToBuyitems();
    
      ToBuyController.displayEmptyMessage = function () {
        return ToBuyController.items.length <= 0? true : false;
      }
    
      ToBuyController.addItem = function () {
        ShoppingListCheckOffService.addItem(ToBuyController.itemName, ToBuyController.itemQuantity);
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
    
      AlreadyBoughtController.addItem = function () {
        try {
            ShoppingListCheckOffService.addItem(AlreadyBoughtController.itemName, AlreadyBoughtController.itemQuantity);
        } catch (error) {
            AlreadyBoughtController.errorMessage = error.message;
        }
    
      }
    
      AlreadyBoughtController.removeItem = function (itemIndex) {
        ShoppingListCheckOffService.removeItem(itemIndex);
      };
    }
    
    
    function ShoppingListCheckOffService() {
      var service = this;
    
      // List of shopping items
      var toBuyitems = [
        {
            "name": "Ice cream",
            "quantity": 5
        },
        {
            "name": "Cookies",
            "quantity": 10
        },
        {
            "name": "Chocolate",
            "quantity": 2
        },
        {
            "name": "Candies",
            "quantity": 3
        },
        {
            "name": "Chips",
            "quantity": 8
        },
      ]
      var boughtItems = []
    
      service.addItem = function (itemName, quantity) {
          var item = {
            name: itemName,
            quantity: quantity
          };
          toBuyitems.push(item);
      };
    
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
    }
    
    })();
    