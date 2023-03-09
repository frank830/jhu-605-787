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
      // console.log("Valid form!!!");
      // console.log(reg.user);
      reg.user.shortName = reg.shortName;
      MenuDataService.setRegistrationInfo(reg.user);
    };

    reg.getMenuItem = function(){
      var promise = MenuDataService.getMenuItem(reg.shortName);
      promise.then(function (response) {
        if(Object.keys(response).length === 0){
          reg.menuNumberMsg = "No such menu number exists."
          reg.invalidMenuNumber = true;
        }else{
          reg.menuNumberMsg = response.name;
          reg.invalidMenuNumber = false;
        }
      })
      .catch(function (error) {
          console.log(error);
          reg.menuNumberMsg = "Something went terribly wrong.";
      });
    }
  }
  
  })();
  