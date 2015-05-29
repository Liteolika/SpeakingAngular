(function () {

    var TestController = function (MessageService) {

        var model = this;

        MessageService.AddMessage("From test controller 1");
        MessageService.AddMessage("From test controller 2");
        MessageService.AddMessage("From test controller 3");
        MessageService.AddMessage("From test controller 4");

    }

    TestController.$inject = ['MessageService'];

    var mainApp = angular.module("mainApp");
    mainApp.controller("TestController", TestController);

}())