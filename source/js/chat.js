var userName = 'user' + Math.floor((Math.random()*1000)+1);

var socket =  io.connect('http://localhost:8080');

socket.on('connect', function() {
    output('<span class="connect-msg">Client has connected to the server!</span>');
});

socket.on('chatevent', function(data) {
    output('<span class="username-msg">' + data.userName + ':</span> ' + data.message);
});

socket.on('disconnect', function() {
    output('<span class="disconnect-msg">The client has disconnected!</span>');
});

function sendDisconnect() {
    socket.disconnect();
}

function sendMessage() {
    var message = $('#msg').val();
    $('#msg').val('');
    socket.emit('chatevent', {userName: userName, message: message});
}

function output(message) {
    var currentTime = "<span class='time'>" +  moment().format('HH:mm:ss.SSS') + "</span>";
    var element = $("<div>" + currentTime + " " + message + "</div>");
    $('#console').prepend(element);
}