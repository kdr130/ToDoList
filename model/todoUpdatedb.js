var MongoClient=require('mongodb').MongoClient;

module.exports.UpdateSave=function(data,callback){
    MongoClient.connect("mongodb://kevin:kevin@ds159670.mlab.com:59670/heroku_h5mzvgnp",function(err,db){

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
