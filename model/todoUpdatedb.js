var MongoClient=require('mongodb').MongoClient;

module.exports.UpdateSave=function(dataSet, callback){
    MongoClient.connect("mongodb://localhost:27017/TodolistDB",function(err,db){

        if(err) throw err;
             db.collection("Todolist").findAndModify(
                    {id: dataSet.id, userName: dataSet.userName},
                    [],
                    { $set: { message: dataSet.message} },
                    {new : true},
                    function(err,doc) {
                        if(err)
                            throw err;
                            
                        callback(doc.value);
                    }
              );

    });
}
