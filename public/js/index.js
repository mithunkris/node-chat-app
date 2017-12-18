var socket = io();

socket.on('connect',function(){
  console.log('Connected to server');
  socket.emit('createEmail',{
    toAddress:"hindu@hindu.com",
    subject:"hero"
  });
});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

socket.on('newEmail',function(email){
  console.log('New Email',email);
});
