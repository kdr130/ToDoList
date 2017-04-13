var MongoClient=require('mongodb').MongoClient;

module.exports.RemoveSave=function(data,callback){
    MongoClient.connect("mongodb://kevin:kevin@ds159670.mlab.com:59670/heroku_h5mzvgnp",function(err,db){

        if(err) throw err;
        //Write databse Insert/Update/Query code here..
        db.collection('Todolist',function(err,collection){
            collection.remove({id:data.id},{w:1}, function(err,result){
               if(err) throw err;
               callback('Message Removed Successfully!');
            });

        });

    });
}
