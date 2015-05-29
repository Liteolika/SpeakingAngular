(function () {

    var MessageService = function ($timeout, $q, MessageDataService, $http) {

        var nextId = 0;

        var currentMessages = [];

        var addMessage = function (messageString) {
            var message = new Message(messageString);
            message.id = nextId;
            nextId++;
            currentMessages.push(message);
            sortMessages(true);
            $timeout(function () {
                removeMessage(message.id);
            }, 10000);

            //MessageDataService.AddMessage(messageString);
            
        }

        var removeMessage = function (id) {
            for (var i = 0; i < currentMessages.length; i++) {
                if (currentMessages[i].id == id)
                {
                    currentMessages.splice(i, 1);
                }
            }
        }

        var sortMessages = function (reverse) {
            currentMessages.sort(function (y, x) {
                if (reverse)
                    return x.timestamp - y.timestamp;
                else
                    return y.timestamp - x.timestamp;
            });
        }

        var getMessages = function () {
            return currentMessages;
        }

        addMessage("Message service has started");

        var addRandom = function () {
            var randomTime = Math.floor((Math.random() * 20000) + 1000);
            addMessage("Next message in " + randomTime / 1000 + " secs.");
            $timeout(addRandom, randomTime);
        }

        addRandom();

        var addApiMessages = function () {

            $http({
                url: "/api/messages",
                method: 'GET'
                }
                ).then(function (response) {
                var messages = response.data;
                for (var i = 0; i < messages.length; i++) {
                    addMessage(messages[i].message);
                }
            }, function (error) {
                addMessage("ERROR: " + error.data.message);
            }).catch(function (exception) {
                var a = 1;
            });

            var randomTime = Math.floor((Math.random() * 20000) + 1000);
            $timeout(addApiMessages, randomTime);

        }

        addApiMessages();


        return {
            GetMessages: getMessages,
            AddMessage: addMessage
        }
    }

    function Message(message) {
        this.id = 0;
        this.message = message;
        this.timestamp = new Date();
    }

    Message.prototype.speak = function () {
        alert("My name is " + this.message);
    }


    MessageService.$inject = ['$timeout', '$q', 'MessageDataService', '$http'];

    var mainApp = angular.module("mainApp");
    mainApp.factory("MessageService", MessageService);

}())
