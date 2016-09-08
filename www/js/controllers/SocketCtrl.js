
var SocketCtrl = function ($scope, $ionicPopup, $cordovaSms) {

    $scope.logs = [
        {message: "Click the button at the upper right to start the service"}
    ];

    $scope.appendLog = function (message) {
        $scope.logs.push({
            message: message
        });
        $scope.$apply();
    };

    $scope.start = function () {
        var WSConnection = WSConnection = new WebSocket('ws://192.168.43.37:3013');
        WSConnection.onopen = function (e) {
            //  for checking
            console.log("Connection established!");
            console.log(e);

            $scope.appendLog("Connection established!");

        };

        WSConnection.onmessage = function (e) {
            console.log(e);

            if (e && e.data) {
                try {
                    var notification = JSON.parse(e.data);

                    if (notification.type == "NOTIFICATION_SALES_ORDER_UPDATED") {
                        var options = {
                            replaceLineBreaks: false, // true to replace \n by a new line, false by default
                            android: {
                                intent: '' // send SMS with the native android SMS messaging
                                        //intent: '' // send SMS without open any other app
                                        //intent: 'INTENT' // send SMS inside a default SMS app
                            }
                        };

                        var siNumber = "SI-" + pad(notification.salesOrderId, 8);
                        var message = "Your order " + siNumber + " has been updated. Status is now " + notification.status;

                        $cordovaSms
                                .send(notification.contact, message, options)
                                .then(function () {
                                    // Success! SMS was sent
                                    console.log('Message sent');
                                    $scope.appendLog("Message sent to " + notification.contact);
                                }, function (error) {
                                    // An error occurred
                                    console.log(error);
                                });

                        //For marshmallow and up
//                        var success = function (hasPermission) {
//                            if (hasPermission) {
//                                $cordovaSms.send(notification.contact, message, options)
//                                        .then(function () {
//                                            // Success! SMS was sent
//                                            console.log('Message sent');
//                                        }, function (error) {
//                                            // An error occurred
//                                            console.log(error);
//                                        });
//                            } else {
//                                $ionicPopup.alert({
//                                    title: 'Error',
//                                    template: "Please allow sms"
//                                });
//                                // show a helpful message to explain why you need to require the permission to send a SMS
//                                // read http://developer.android.com/training/permissions/requesting.html#explain for more best practices
//                            }
//                        };
                        var error = function (e) {
                            console.error(e)
                            $ionicPopup.alert({
                                title: 'Error',
                                template: e
                            });
                        };
                        $cordovaSms.hasPermission(success, error);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        };

    };

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

};