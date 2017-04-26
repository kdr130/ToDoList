var MongoClient=require('mongodb').MongoClient;

module.exports.QueryGet = function(dataSet, callback){
    MongoClient.connect("mongodb://localhost:27017/TodolistDB",function(err,db){

        if(err) throw err;
        db.collection('Todolist',function(err,collection){
            if(dataSet.message) {
                console.log("dataSet.message: " + dataSet.message + ", dataSet.userName: " + dataSet.userName);
                console.dir(dataSet);

                collection.find({'userName': dataSet.userName, 'message' : {$regex : '.*'+ dataSet.message+ '.*'}}).toArray(function(err,items){
                  if(err) throw err;
                    //console.log('QueryGet: ' + JSON.stringify(items));
                    callback(items);
                });
            } else {
                //console.log("dataSet.userName: " + dataSet.userName);
                collection.find({'userName': dataSet.userName}).toArray(function(err,items){
                    if(err) throw err;
                    //console.log('QueryGet: ' + JSON.stringify(items));
                    callback(items);
                });
            }
        });

    });
}

module.exports.QueryUserName = function(data, callback){
    MongoClient.connect("mongodb://localhost:27017/TodolistDB",function(err,db){

        if(err) throw err;
        db.collection('User',function(err, collection){
            //console.log("data: " + data);
            if(data) {
                collection.find({'username' : data}).toArray(function(err,items){
                  if(err) throw err;
                    //console.log('QueryUserName: ' + JSON.stringify(items));
                    callback(items);
                });
            }
        });

    });
}

module.exports.QueryUserNameAndPassWord = function(dataSet, callback){
    MongoClient.connect("mongodb://localhost:27017/TodolistDB",function(err, db){

        if(err) throw err;

        db.collection('User',function(err, collection){
            //console.dir(dataSet);
            if(dataSet) {
                collection.find({'username' :dataSet.username, 'password' : dataSet.password}).toArray(function(err,items){
                  if(err) throw err;
                    //console.log('QueryUserName: ' + JSON.stringify(items));
                    callback(items);
                });
            }
        });

    });
}
