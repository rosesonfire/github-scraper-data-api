'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var dataController = _ref.dataController;
  return {
    get: {
      '^/scrapedData/:key$': dataController.readData
    },
    post: {
      '^/scrapedData$': dataController.writeData
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluL3JvdXRlcy5qcyJdLCJuYW1lcyI6WyJkYXRhQ29udHJvbGxlciIsImdldCIsInJlYWREYXRhIiwicG9zdCIsIndyaXRlRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQUFlO0FBQUEsTUFBR0EsY0FBSCxRQUFHQSxjQUFIO0FBQUEsU0FBeUI7QUFDdENDLFNBQUs7QUFDSCw2QkFBdUJELGVBQWVFO0FBRG5DLEtBRGlDO0FBSXRDQyxVQUFNO0FBQ0osd0JBQWtCSCxlQUFlSTtBQUQ3QjtBQUpnQyxHQUF6QjtBQUFBLEMiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgKHsgZGF0YUNvbnRyb2xsZXIgfSkgPT4gKHtcbiAgZ2V0OiB7XG4gICAgJ14vc2NyYXBlZERhdGEvOmtleSQnOiBkYXRhQ29udHJvbGxlci5yZWFkRGF0YVxuICB9LFxuICBwb3N0OiB7XG4gICAgJ14vc2NyYXBlZERhdGEkJzogZGF0YUNvbnRyb2xsZXIud3JpdGVEYXRhXG4gIH1cbn0pXG4iXX0=