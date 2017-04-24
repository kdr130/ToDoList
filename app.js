var express = require('express');
var app = express();
var todoRouter = require('./routes/todo.js');
var bodyParser = require( 'body-parser' );
var nunjucks  = require('nunjucks');
//var dataset=require('./recordset.js');  //資料集...方便測試View流程使用

//set view engine
nunjucks.configure('views', {
  autoescape: true,
  express   : app
});


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


app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
