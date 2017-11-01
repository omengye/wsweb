$(function() {


  // Initialize varibles
  var $window = $(window);
  var $lasts = $('#lasts'); 

  // Prompt for setting a userid
  var userid;
  var connected = false;

  var socket = io();
  
  // Log a message
  function log (message) {
    console.log(message);
  }

  // Socket events

  socket.on('connected', function(userid){
    socket.emit('add user', '');
    log('add user '+ userid)
  });

  socket.on('login success', function(data){
    console.log(data);
    socket.disconnect();
    window.location.href = window.location.origin+'/s';
  });

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "Welcome to Search";
    log(message);
    $('#qrcode').empty();
    jQuery('#qrcode').qrcode({
      text	: window.location.href+"login.html?userid="+data
    });	
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('time count', function (data) {
    log('time count ' + data);
    $('#lasts').text(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (userid) {
    log(userid + ' left');
  });

});
