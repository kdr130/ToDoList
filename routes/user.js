var express = require('express');
var router = express.Router();
var modelQuery = require('../model/todoQuerydb.js');
var modelCreate = require('../model/todoCreatedb.js');

router.get('/login',function(req,res){
    res.render('login.html', {});
});

router.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    //console.log("login post: " + username + ", " + password );

    modelQuery.QueryUserName(username, function(result){
        //console.log("result.length: " + result.length);
        if (result.length > 0) {
            // 有資料了，要比對密碼
            var dataSet = {'username': username, 'password': password};

            modelQuery.QueryUserNameAndPassWord(dataSet, function(result){
                //console.dir(result);
                //console.log("result[0].username: " + result[0].username);
                if (result[0]) {
                    console.log("")
                    res.json({success : "true", status : 200});
                } else {
                    res.json({success : "false", status : 200});
                }
            });

        } else {
            // 沒有資料，顯示使用者名稱錯誤
            res.json({success : "false", status : 200});
        }
    });
});

router.get('/registration',function(req,res){
    res.render('registration.html', {});
});

router.post('/registration',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    //console.log("user registration post: " + username + ", " + password);

    modelQuery.QueryUserName(username, function(result) {
        console.log("result.length: " + result.length);
        if (result.length > 0) {
            // 有資料了，要顯示"更改username"
            res.json({success : "false", status : 200});
        } else {
            var dataset=[{username:username, password:password}];

            modelCreate.InsertNewUser(dataset, function(result){
                console.log(result);
                res.json({success : "true", status : 200});
            })

        }
    });
});

module.exports=router;
