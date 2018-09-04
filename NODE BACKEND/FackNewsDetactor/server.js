require('./config/config');
var express = require('express');
var bodyparser= require('body-parser');

var user = require('./src/com/SERVER/Routes/user');


const port = process.env.PORT || 3000;
var app = express();
app.use(user);
app.use(bodyparser.json());
app.listen(port,(err)=>{
    console.log(err);
})

