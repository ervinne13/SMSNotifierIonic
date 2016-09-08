var AccountCtrl = function ($scope, $ionicPopup, LocalStorage) {

    $scope.settings = {
        server: LocalStorage.get('SERVER'),
        port: LocalStorage.get('PORT')
    };

    $scope.save = function () {
        LocalStorage.set('SERVER', $scope.settings.server);
        LocalStorage.set('PORT', $scope.settings.port);

        $ionicPopup.alert({
            title: 'Success',
            template: "Saved!"
        });
    };

};