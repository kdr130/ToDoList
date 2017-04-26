var express = require('express');
var app = express();
var todoRouter = require('./routes/todo.js');
var userRouter = require('./routes/user.js');
var bodyParser = require( 'body-parser' );
var nunjucks  = require('nunjucks');
var session = require('express-session');
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

app.use(session({
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 60 * 1000 },
    resave: true,
    saveUninitialized: true
}));

// Apply this router on (/restful)
app.use('/restful', todoRouter);
app.use('/restful', express.static(__dirname+'/public'));

app.use('/user', userRouter);
app.use('/user', express.static(__dirname+'/public'));

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
