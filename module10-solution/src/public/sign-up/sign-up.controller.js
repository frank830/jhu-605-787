(function () {
  'use strict';

  angular.module('public')
  .controller('SignUpController', SignUpController);
  
  SignUpController.$inject = ['MenuDataService'];
  function SignUpController(MenuDataService) {
    var reg = this;

    reg.user = {};

    reg.menuNumberMsg = "";
    reg.invalidMenuNumber = false;
    
    reg.submitForm = function () {
      reg.completed = true;
      reg.user.shortName = reg.shortName;
      reg.user.categoryShortName = reg.categoryShortName;
      MenuDataService.setRegistrationInfo(reg.user);
    };

    reg.getMenuItem = function(){
      var promise = MenuDataService.getMenuItem(reg.shortName);
      promise.then(function (response) {
        if(Object.keys(response).length === 0){
          reg.menuNumberMsg = "No such menu number exists."
          reg.invalidMenuNumber = true;
          reg.categoryShortName = "";
        }else{
          reg.menuNumberMsg = response.name;  //show use the name of the menu item
          reg.invalidMenuNumber = false;
          reg.categoryShortName = response.categoryShortName;
        }
      })
      .catch(function (error) {
          console.log(error);
          reg.menuNumberMsg = "Something went terribly wrong.";
          reg.categoryShortName = "";
      });
    }
  }
  
  })();
  