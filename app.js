var express = require('express');
var app = express();
var todoRouter = require('./routes/todo.js');
var bodyParser = require( 'body-parser' );

//var dataset=require('./recordset.js');  //資料集...方便測試View流程使用
//set view engine
app.set("view engine","jade")
//set view directory
app.set("views",__dirname+"/views")

// configure app to use bodyParser()
// this will let us get the data from Request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.get('/', function(req, res) {
    res.redirect('/restful/todo');
});

// Apply this router on (/restful)
app.use('/restful', todoRouter);
app.use('/restful',express.static(__dirname+'/public'));

app.listen(3000,function(){
    console.log('Ready...for 3000');
});
