var Socket = function (socketFactory, LocalStorage) {

    return {
        connect: function () {
            var server = LocalStorage.get('SERVER');
            var port = LocalStorage.get('PORT');

            var url = server + ":" + port;

            console.log(url);

            //Create socket and connect to http://chat.socket.io 
            var myIoSocket = io.connect(url);

            mySocket = socketFactory({
                ioSocket: myIoSocket
            });

            return mySocket;
        }
    };

};