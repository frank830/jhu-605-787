(function () {
    "use strict";

    angular.module('public')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['MenuDataService'];

    function InfoController(MenuDataService) {
        var infoCtrlroller = this;                
        infoCtrlroller.lastName = "";
        infoCtrlroller.firstName = "";
        infoCtrlroller.email = "";
        infoCtrlroller.phone = "";
        infoCtrlroller.shortName = "";
        infoCtrlroller.title = "";
        infoCtrlroller.description = "";
        infoCtrlroller.categoryShortName = "";

        infoCtrlroller.checkIfRegistered = function () {
            var userInfo = MenuDataService.getRegistrationInfo();
            console.log(userInfo);

            if (userInfo) {
                infoCtrlroller.lastName = userInfo.lastName;
                infoCtrlroller.firstName = userInfo.firstName;
                infoCtrlroller.email = userInfo.email;
                infoCtrlroller.phone = userInfo.phone;
                infoCtrlroller.shortName = userInfo.shortName;
                infoCtrlroller.categoryShortName = userInfo.categoryShortName;
                // infoCtrlroller.title = userInfo.name;
                // infoCtrlroller.description = userInfo.description;
                // $ctrl.basePath = ApiPath;
                return true;
            } else {
                return false;
            }
        }
    }

})();
