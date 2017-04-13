var MongoClient=require('mongodb').MongoClient;

module.exports.QueryGet=function(data,callback){
    MongoClient.connect("mongodb://kevin:kevin@ds159670.mlab.com:59670/heroku_h5mzvgnp",function(err,db){

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
