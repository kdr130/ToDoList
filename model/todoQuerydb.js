var MongoClient=require('mongodb').MongoClient;

module.exports.QueryGet = function(data,callback){
    MongoClient.connect("mongodb://localhost:27017/TodolistDB",function(err,db){

        if(err) throw err;
        db.collection('Todolist',function(err,collection){
            if(data.message) {
                collection.find({'message' : {$regex : '.*'+ data.message+ '.*'}}).toArray(function(err,items){
                  if(err) throw err;
                    //console.log('QueryGet: ' + JSON.stringify(items));
                    callback(items);
                });
            } else {
                collection.find({}).toArray(function(err,items){
                    if(err) throw err;
                    //console.log('QueryGet: ' + JSON.stringify(items));
                    callback(items);
                });
            }
        });

    });
}

module.exports.QueryUserName = function(data,callback){
    MongoClient.connect("mongodb://localhost:27017/TodolistDB",function(err,db){

        if(err) throw err;
        db.collection('User',function(err,collection){
            console.log("data: " + data);
            if(data) {
                collection.find({'message' : {$regex : data}}).toArray(function(err,items){
                  if(err) throw err;
                    console.log('QueryUserName: ' + JSON.stringify(items));
                    callback(items);
                });
            }
        });

    });
}
