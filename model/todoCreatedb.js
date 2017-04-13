var MongoClient = require('mongodb').MongoClient;

var loadData = function(data, callback) {
  MongoClient.connect("mongodb://kevin:kevin@ds159670.mlab.com:59670/heroku_h5mzvgnp", function(err, db) {
      if (err) {
          throw err;
      }

      db.collection('Todolist', function(err, collection) {
          if (err) {
              throw err;
          }

          // 取得目前 db 中，擁有最大 id 的資料
          // sort({id:-1}) 表示 id 最大的擺在最前面
          var maxIDData = collection.find().sort({id:-1}).limit(1);

          maxIDData.toArray(function(err, items) {
              if (err) {
                  throw err;
              }

              var dataSet = [];
              var maxID = 0;

              if ( items.length == 1 ) {
                  maxID = items[0].id;
                  console.log("maxID in db is " + maxID);
              }
              maxID++;

              //把傳進來的data，變成一個新的dataset，給insertMany
              data.map(function(obj){
                 dataSet.push({id:maxID++, message:obj.message});
              });

              // 加入資料
              collection.insertMany(dataSet, function(err, res) {
                  if (err) {
                      throw err;
                  }

                  console.log("insert dataSet: " + JSON.stringify(dataSet));
                  console.log("res: " + JSON.stringify(res));
                  callback(res.result.n);
              });
          });

          /*
          collection.insertMany(data, function(err, res) {
              if (err) {
                  throw err;
              }

              console.log("insert data: " + JSON.stringify(data));
              console.log("res: " + JSON.stringify(res));
              callback(res.result.n);
          })
          */
      });
  });
}

module.exports.InsertNew = loadData;
