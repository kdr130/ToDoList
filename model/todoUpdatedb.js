var MongoClient=require('mongodb').MongoClient;

module.exports.UpdateSave=function(data,callback){
    MongoClient.connect("mongodb://localhost:27017/TodolistDB",function(err,db){

        if(err) throw err;
             db.collection("Todolist").findAndModify(
                    {id:data.id},
                    [],
                    { $set: { message:data.message} },
                    {new : true},
                    function(err,doc) {
                        if(err) throw err;
                        callback(doc.value);
                    }
              );

    });
}
