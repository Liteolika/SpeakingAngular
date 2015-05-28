(function () {

    var homeController = function (MessageService) {

        var model = this;

        var postMessage = function () {

            MessageService.AddMessage(model.message);
            model.message = '';
        }

        model.message = 'Hej hej';
        model.postMessage = postMessage;

    }

    homeController.$inject = ['MessageService'];
    var mainApp = angular.module("mainApp");
    mainApp.controller("HomeController", homeController);

}())