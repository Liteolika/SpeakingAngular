(function () {


    var ShellController = function (MessageService, $log, $timeout) {

        var model = this;

        model.messages = [];

        MessageService.AddMessage("Started the shell controller");

        model.messages = MessageService.GetMessages();
        

    }

    ShellController.$inject = ['MessageService','$log', '$timeout'];

    var mainApp = angular.module("mainApp");

    mainApp.controller("ShellController", ShellController);

}());