(function () {
  'use strict';

  angular.module('public')
  .controller('SignUpController', SignUpController);
  
  SignUpController.$inject = ['MenuDataService'];
  function SignUpController(MenuDataService) {
    var reg = this;
  
    reg.submitForm = function () {
      reg.completed = true;
      console.log("Valid!!!")
    };
  }
  
  })();
  