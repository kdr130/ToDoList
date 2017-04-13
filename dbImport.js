var loadDataToDB = require('./loadDataToDB');
var toDoListData = require('./recordSet');

console.log(toDoListData);

loadDataToDB.InsertNewData(toDoListData, function(insertCount) {
    console.log("Add new data count: " + insertCount);
});
