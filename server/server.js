const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

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

  socket.emit('newMessage',generateMessage('Admin','Welcome to te chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

  socket.on('createMessage',(message)=>{
    console.log('New message Created',message);
     io.emit('newMessage',generateMessage(message.from,message.text));
    })
    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // });
 });


app.use(express.static(publicPath));
server.listen(port,(req,res)=>{
  console.log(`Starting the app on port ${port}`);
})
