(function () {

    var MessageDataService = function ($http) {

        var apiUrl = "/api/messages";

        var addMessage = function (message) {
            return $http.post(apiUrl, message);
        }

        var getMessages = function () {
            return $http.get(apiUrl);
        }


        return {
            AddMessage: addMessage,
            GetMessages: getMessages
        }

    }

    MessageDataService.$inject = ['$http'];

    var mainApp = angular.module("mainApp");
    mainApp.factory("MessageDataService", MessageDataService);


}())