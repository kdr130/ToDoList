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
router.get('/todo',function(req,res){
   //mongodb find all.....
   //console.log('get /todo');
   modelQuery.QueryGet({},function(record){
     if(req.xhr) {
        //console.log('recordTP');
        res.render('recordTP',{layout:false, itemlist:record});
     } else {
        //console.log('restfulTP');
        res.render('restfulTP',{itemlist:record});
     }
   });

});

// CREATE (/restful/todo)
router.post('/todo', function(req, res) {
    // ...
    var data = req.body.momsg;
    console.log('req.body.momsg: ' + data );

    if (/\S/.test(data)) {
        // string is not empty and not just whitespace
        var dataset=[{message:data}];

        modelCreate.InsertNew(dataset, function(msg){
            return res.redirect('/restful/todo');
        });
    }
});

// READ (/restful/todo/:id)
// 這邊要注意的：這裡的id是網址列後的搜尋字串
// 在用 req.params是根據路由給的參數名稱, 與req.body的不同處!
// 如果你怕會搞混, 請修改!
router.get('/todo/:id', function(req, res) {
    // mongodb find one or all...
     var dataset={message:req.params.id}
     modelQuery.QueryGet(dataset,function(record){
      if(req.xhr)
         res.render('recordTP',{layout:false, itemlist:record});
       else
         res.render('restfulTP',{itemlist:record});
     });
    //res.send('you push a request to read one');
})

// UPDATE ((/restful/todo/:id))
router.put('/todo/:id', function(req, res) {
    // ...
     var dataset={id:parseInt(req.params.id),message:req.body.momsg};
     modelUpdate.UpdateSave(dataset,function(record){

         res.render('oneTP',{layout:false,
                oneid:record.id,onemsg:record.message});

     });
    //res.send('you push a request to put! ' + req.body.moid+req.body.momsg);
});

// DELETE (/restful/todo/:id)
router.delete('/todo/:id', function(req, res) {
    // ...
    var dataset={id:parseInt(req.params.id)}
    //console.log(dataset);
    modelRemove.RemoveSave(dataset,function(msg){
         res.send(msg);
     });
});


module.exports=router;
