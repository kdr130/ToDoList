var express = require('express');
var router = express.Router();

router.get('/login',function(req,res){
    res.render('login.html', {});
});

router.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log("user login post");

    console.log(username + ", " + password );

});


module.exports=router;
