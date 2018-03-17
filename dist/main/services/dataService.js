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
    writeData: async function writeData(dataList) {
      return Promise.all(dataList.map(function (data) {
        return odm.create({ key: data.author.uri, data: data }).save();
      }));
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL3NlcnZpY2VzL2RhdGFTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIm9kbSIsIndyaXRlRGF0YSIsImRhdGFMaXN0IiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNyZWF0ZSIsImtleSIsImRhdGEiLCJhdXRob3IiLCJ1cmkiLCJzYXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtrQkFDZTtBQUFBLE1BQUdBLEdBQUgsUUFBR0EsR0FBSDtBQUFBLFNBQWM7QUFDM0I7QUFDQTtBQUNBQyxlQUFXLHlCQUFPQyxRQUFQO0FBQUEsYUFBb0JDLFFBQVFDLEdBQVIsQ0FDN0JGLFNBQVNHLEdBQVQsQ0FBYTtBQUFBLGVBQVFMLElBQUlNLE1BQUosQ0FBVyxFQUFFQyxLQUFLQyxLQUFLQyxNQUFMLENBQVlDLEdBQW5CLEVBQXdCRixVQUF4QixFQUFYLEVBQTJDRyxJQUEzQyxFQUFSO0FBQUEsT0FBYixDQUQ2QixDQUFwQjtBQUFBO0FBSGdCLEdBQWQ7QUFBQSxDIiwiZmlsZSI6ImRhdGFTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRVRMJ3MgcmVxdWlyZWQgZGF0YSBmcm9tIGVuZHBvaW50IHRvIHBlcnNpc3RlbmNlXG5leHBvcnQgZGVmYXVsdCAoeyBvZG0gfSkgPT4gKHtcbiAgLy8gVE9ETzogcHJvbWlzZS5hbGwgd2lsbCBmYWlsIGV2ZW4gaWYgc29tZSBkYXRhIGdldHMgcGVyc2lzdGVkXG4gIC8vICAgICAgIHNvIHRoaXMgbmVlZHMgdG8gYmUgZml4ZWRcbiAgd3JpdGVEYXRhOiBhc3luYyAoZGF0YUxpc3QpID0+IFByb21pc2UuYWxsKFxuICAgIGRhdGFMaXN0Lm1hcChkYXRhID0+IG9kbS5jcmVhdGUoeyBrZXk6IGRhdGEuYXV0aG9yLnVyaSwgZGF0YSB9KS5zYXZlKCkpKVxufSlcbiJdfQ==