var MongoClient = require('mongodb').MongoClient;

var loadData = function(data, callback) {
    MongoClient.connect("mongodb://localhost:27017/todoDB", function(err, db) {
        if (err) {
            throw err;
        }

        // 取得 collection
        db.collection('Todolist', function(err, collection) {
            if (err) {
                throw err;
            }

            // 加入資料
            collection.insertMany(data, function(err, res) {
                if (err) {
                    throw err;
                }

                console.log("insert data: " + JSON.stringify(data));
                console.log("res: " + JSON.stringify(res));
                callback(res.result.n);
            })
        })
    });
}

module.exports.InsertNewData = loadData;
