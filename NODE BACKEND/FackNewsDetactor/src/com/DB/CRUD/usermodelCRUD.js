var {User} = require("../Model/usermodel");
var _ = require('lodash');

var saveUser = function(user, callback){
 var newuser =  new User(user);
 newuser.save().then((record=>{
    console.log(record);
    callback("Record saved successfully");
   
 }),(err)=>{
   console.log(err);
   callback("can not save the record");
 });
}

module.exports = { saveUser };