

var main = {};
var io = require('socket.io-client');

main.sock = function(address){

  var socket = io.connect(address, {reconnect: true});
  // Add a connect listener
  socket.on('connect', function(socket) {
      console.log('Connected!');
  });

return {
  s:socket
}


}

module.exports = main;
