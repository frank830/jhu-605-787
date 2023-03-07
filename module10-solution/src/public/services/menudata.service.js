(function () {
    'use strict';
    
    angular.module('public')
    .service("MenuDataService", MenuDataService);
    
    MenuDataService.$inject = ['$http'];
    function MenuDataService($http){
        var service = this;

        service.check = function(){
          console.log("jenu data service checking!!!")
        }
    };
    
    })();
    