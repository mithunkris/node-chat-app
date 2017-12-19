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

  socket.emit('newMessage',{
    from:'Admin',
    text:'Welcome to the chat room',
    createdAt:new Date().getTime()
  })
  socket.broadcast.emit('newMessage',{
    from:'Admin',
    text:'New User joined',
    createdAt:new Date().getTime()
  });

  socket.on('createMessage',(message)=>{
    console.log('New message Created',message);
    // io.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // })
    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // });
  });
});


app.use(express.static(publicPath));
server.listen(port,(req,res)=>{
  console.log(`Starting the app on port ${port}`);
})
