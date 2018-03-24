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
    readData: odm.get
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL3NlcnZpY2VzL2RhdGFTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIm9kbSIsIndyaXRlRGF0YSIsIlByb21pc2UiLCJhbGwiLCJkYXRhTGlzdCIsIm1hcCIsImNyZWF0ZSIsImtleSIsImRhdGEiLCJhdXRob3IiLCJ1cmkiLCJzYXZlIiwicmVhZERhdGEiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO2tCQUNlO0FBQUEsTUFBR0EsR0FBSCxRQUFHQSxHQUFIO0FBQUEsU0FBYztBQUMzQjtBQUNBO0FBQ0FDLGVBQVc7QUFBQSxhQUFZQyxRQUFRQyxHQUFSLENBQ3JCQyxTQUFTQyxHQUFULENBQWE7QUFBQSxlQUFRTCxJQUFJTSxNQUFKLENBQVcsRUFBRUMsS0FBS0MsS0FBS0MsTUFBTCxDQUFZQyxHQUFuQixFQUF3QkYsVUFBeEIsRUFBWCxFQUEyQ0csSUFBM0MsRUFBUjtBQUFBLE9BQWIsQ0FEcUIsQ0FBWjtBQUFBLEtBSGdCO0FBSzNCQyxjQUFVWixJQUFJYTtBQUxhLEdBQWQ7QUFBQSxDIiwiZmlsZSI6ImRhdGFTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRVRMJ3MgcmVxdWlyZWQgZGF0YSBmcm9tIGVuZHBvaW50IHRvIHBlcnNpc3RlbmNlXG5leHBvcnQgZGVmYXVsdCAoeyBvZG0gfSkgPT4gKHtcbiAgLy8gVE9ETzogcHJvbWlzZS5hbGwgd2lsbCBmYWlsIGV2ZW4gaWYgc29tZSBkYXRhIGdldHMgcGVyc2lzdGVkXG4gIC8vICAgICAgIHNvIHRoaXMgbmVlZHMgdG8gYmUgZml4ZWRcbiAgd3JpdGVEYXRhOiBkYXRhTGlzdCA9PiBQcm9taXNlLmFsbChcbiAgICBkYXRhTGlzdC5tYXAoZGF0YSA9PiBvZG0uY3JlYXRlKHsga2V5OiBkYXRhLmF1dGhvci51cmksIGRhdGEgfSkuc2F2ZSgpKSksXG4gIHJlYWREYXRhOiBvZG0uZ2V0XG59KVxuIl19