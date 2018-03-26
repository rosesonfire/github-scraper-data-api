"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// ETL's required data from endpoint to persistence
exports.default = function (_ref) {
  var odm = _ref.odm;
  return {
    // TODO: promise.all will fail even if some data gets persisted
    //       so this needs to be fixed
    writeData: function writeData(dataList) {
      return Promise.all(dataList.map(function (data) {
        return odm.create({ key: data.author.uri, data: data }).save();
      }));
    },
    readData: function readData(key) {
      return odm.get(key).then(function (objectModel) {
        return objectModel.data;
      });
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL3NlcnZpY2VzL2RhdGFTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIm9kbSIsIndyaXRlRGF0YSIsIlByb21pc2UiLCJhbGwiLCJkYXRhTGlzdCIsIm1hcCIsImNyZWF0ZSIsImtleSIsImRhdGEiLCJhdXRob3IiLCJ1cmkiLCJzYXZlIiwicmVhZERhdGEiLCJnZXQiLCJ0aGVuIiwib2JqZWN0TW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO2tCQUNlO0FBQUEsTUFBR0EsR0FBSCxRQUFHQSxHQUFIO0FBQUEsU0FBYztBQUMzQjtBQUNBO0FBQ0FDLGVBQVc7QUFBQSxhQUFZQyxRQUFRQyxHQUFSLENBQ3JCQyxTQUFTQyxHQUFULENBQWE7QUFBQSxlQUFRTCxJQUFJTSxNQUFKLENBQVcsRUFBRUMsS0FBS0MsS0FBS0MsTUFBTCxDQUFZQyxHQUFuQixFQUF3QkYsVUFBeEIsRUFBWCxFQUEyQ0csSUFBM0MsRUFBUjtBQUFBLE9BQWIsQ0FEcUIsQ0FBWjtBQUFBLEtBSGdCO0FBSzNCQyxjQUFVO0FBQUEsYUFBT1osSUFBSWEsR0FBSixDQUFRTixHQUFSLEVBQWFPLElBQWIsQ0FBa0I7QUFBQSxlQUFlQyxZQUFZUCxJQUEzQjtBQUFBLE9BQWxCLENBQVA7QUFBQTtBQUxpQixHQUFkO0FBQUEsQyIsImZpbGUiOiJkYXRhU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEVUTCdzIHJlcXVpcmVkIGRhdGEgZnJvbSBlbmRwb2ludCB0byBwZXJzaXN0ZW5jZVxuZXhwb3J0IGRlZmF1bHQgKHsgb2RtIH0pID0+ICh7XG4gIC8vIFRPRE86IHByb21pc2UuYWxsIHdpbGwgZmFpbCBldmVuIGlmIHNvbWUgZGF0YSBnZXRzIHBlcnNpc3RlZFxuICAvLyAgICAgICBzbyB0aGlzIG5lZWRzIHRvIGJlIGZpeGVkXG4gIHdyaXRlRGF0YTogZGF0YUxpc3QgPT4gUHJvbWlzZS5hbGwoXG4gICAgZGF0YUxpc3QubWFwKGRhdGEgPT4gb2RtLmNyZWF0ZSh7IGtleTogZGF0YS5hdXRob3IudXJpLCBkYXRhIH0pLnNhdmUoKSkpLFxuICByZWFkRGF0YToga2V5ID0+IG9kbS5nZXQoa2V5KS50aGVuKG9iamVjdE1vZGVsID0+IG9iamVjdE1vZGVsLmRhdGEpXG59KVxuIl19