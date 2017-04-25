var express = require('express');
var router = express.Router();
var modelQuery = require('../model/todoQuerydb.js');

router.get('/login',function(req,res){
    res.render('login.html', {});
});

router.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log("user login post");

    console.log(username + ", " + password );
});

router.get('/registration',function(req,res){
    res.render('registration.html', {});
});

router.post('/registration',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log("user registration post: " + username + ", " + password);

    modelQuery.QueryUserName(username, function(result){
        console.log("result: " + result);
        if (result) {
            // 有資料了，要顯示"更改username"
        } else {
            
        }
    });
});

module.exports=router;
