const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log('New User connected');
  socket.on('disconnect',()=>{
    console.log('User Disconnected');
  });

  socket.on('createEmail',(newEmail)=>{
    console.log('New Email Created',newEmail);
  });

  socket.emit('newEmail',{
    from: "mithun@gmail.com",
    text:"Hi how are you",
    createdby:"2017"
  });
});


app.use(express.static(publicPath));
server.listen(port,(req,res)=>{
  console.log(`Starting the app on port ${port}`);
})
