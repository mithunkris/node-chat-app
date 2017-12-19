const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');

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

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
  // socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

  socket.on('createMessage',(message,callback)=>{
    console.log('New message Created',message);
     io.emit('newMessage',generateMessage(message.from,message.text));
     callback('this is from the server');
   });

   socket.on('createLocationMessage',(coords)=>{
     console.log('Coords Sent',coords);
     io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
   });

 });

app.use(express.static(publicPath));
server.listen(port,(req,res)=>{
  console.log(`Starting the app on port ${port}`);
})
