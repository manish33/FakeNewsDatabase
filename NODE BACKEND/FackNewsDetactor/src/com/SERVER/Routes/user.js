var express = require('express');
var bodyparser = require('body-parser');
var usercrud = require('../../DB/CRUD/usermodelCRUD');
var _ = require('lodash');

var router = express.Router();

router.post('/signup', bodyparser.json(),(req,res)=>{
var user = _.pick(req.body,['firstName','lastName','email','country','state','password']);
usercrud.saveUser(user,(msg)=>{
console.log(msg);
});

});

module.exports= router;
