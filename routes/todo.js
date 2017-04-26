var express = require('express');
var router = express.Router();

// load mongodb-CURL
var modelCreate = require('../model/todoCreatedb.js');
var modelUpdate = require('../model/todoUpdatedb.js');
var modelRemove = require('../model/todoRemovedb.js');
var modelQuery = require('../model/todoQuerydb.js');

// middleware that is specific to this router
/*
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
*/

// READ ALL & FORM (/restful/todo)
router.get('/todo',function(req,res) {
    if(req.session.UserName) {
        var dataSet = {userName: req.session.UserName};
        modelQuery.QueryGet(dataSet, function(record){
         if(req.xhr) {
            //console.log('recordTP');
            res.render('recordTP.html',{layout:false, itemlist:record});
         } else {
            //console.log('restfulTP');
            var data = {itemlist:record};
            data.UserName = req.session.UserName;

            //console.dir(data);

            res.render('restfulTP.html', data);
         }
        });
    } else {
        res.render('restfulTP.html');
    }
});

// CREATE (/restful/todo)
router.post('/todo', function(req, res) {
    var data = req.body.momsg;

    if (/\S/.test(data)) {
        // string is not empty and not just whitespace
        var dataset = {message: data, userName: req.session.UserName};

        modelCreate.InsertNewTodo(dataset, function(msg){
            return res.redirect('/restful/todo');
        });
    }
});

// READ (/restful/todo/:data)
router.get('/todo/:data', function(req, res) {
     // mongodb find one or all...

     var dataset={userName: req.session.UserName, message: req.params.data}
     modelQuery.QueryGet(dataset,function(record){
      if(req.xhr)
         res.render('recordTP.html',{layout:false, itemlist:record});
       else
         res.render('restfulTP.html',{itemlist:record});
     });
    //res.send('you push a request to read one');
})

// UPDATE ((/restful/todo/:id))
router.put('/todo/:id', function(req, res) {
     var dataSet = {id:parseInt(req.params.id), message: req.body.momsg, userName: req.session.UserName};
     modelUpdate.UpdateSave(dataSet,function(record){
         res.render('oneTP.html',{layout:false,
                oneid:record.id, onemsg:record.message});

     });
});

// DELETE (/restful/todo/:id)
router.delete('/todo/:id', function(req, res) {
    var dataset={id: parseInt(req.params.id), userName: req.session.UserName}
    //console.log(dataset);
    modelRemove.RemoveSave(dataset,function(msg){
         res.send(msg);
     });
});


module.exports=router;
