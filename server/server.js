const path = require('path');
const express = require('express');

var publicPath = path.join(__dirname,'../public');
cont port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));
app.listen(port,(req,res)=>{
  console.log(`Starting the app on port ${port}`);
})
