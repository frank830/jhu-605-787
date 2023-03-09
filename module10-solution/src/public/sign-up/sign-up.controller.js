(function () {
  'use strict';

  angular.module('public')
  .controller('SignUpController', SignUpController);
  
  SignUpController.$inject = ['MenuDataService'];
  function SignUpController(MenuDataService) {
    var reg = this;

    reg.message = "";
    
    reg.submitForm = function () {
      reg.completed = true;
      console.log("Valid!!!")
    };

    reg.getMenuItem = function(){
      console.log(reg.shortName)
      var promise = MenuDataService.getMenuItem(reg.shortName);

      promise.then(function (response) {
        console.log(response)
        console.log(response.length)
        if(Object.keys(response).length === 0){
          reg.message = "No such menu number exists."
        }else{
          reg.message = response.name;
        }
      })
      .catch(function (error) {
          console.log("Something went terribly wrong.");
          reg.message = "Something went terribly wrong.";
      });
    }
  }
  
  })();
  