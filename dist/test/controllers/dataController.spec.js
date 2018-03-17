'use strict';

var _setup = require('./../setup');

var _dataController = require('./../../main/controllers/dataController');

var _dataController2 = _interopRequireDefault(_dataController);

var _dataService = require('./../mocks/services/dataService');

var _dataService2 = _interopRequireDefault(_dataService);

var _expressWrapper = require('./../mocks/lib/wrappers/expressWrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mocks
(0, _setup.describe)('DataController', function () {
  var mocks = void 0,
      dataService = void 0,
      req = void 0,
      res = void 0,
      expectedProperties = void 0,
      positiveResponse = void 0;

  (0, _setup.before)(function () {
    req = {
      body: {
        data: '{ "jsonData": "some data"}'
      }
    };
    expectedProperties = ['writeData'];
    positiveResponse = Promise.resolve('OK');
  });

  (0, _setup.beforeEach)(function () {
    res = (0, _expressWrapper.resMock)();
    dataService = (0, _dataService2.default)();
    dataService.writeData.once().withExactArgs(req.body.data).returns(positiveResponse);
    res.setBufferedResponse.once().withExactArgs(positiveResponse);
  });

  (0, _setup.afterEach)(function () {
    return mocks.forEach(function (mock) {
      return mock.verify();
    });
  });

  (0, _setup.describe)('When creating dataController', function () {
    (0, _setup.beforeEach)(function () {
      mocks = [];
    });
    (0, _setup.it)('should have the expected properties', function () {
      return (0, _dataController2.default)({ dataService: dataService }).should.have.all.keys(expectedProperties);
    });
  });

  (0, _setup.describe)('When writing data', function () {
    (0, _setup.beforeEach)(function () {
      mocks = [dataService.writeData, res.setBufferedResponse];
    });
    (0, _setup.it)('should write data successfully', function () {
      return (0, _dataController2.default)({ dataService: dataService }).writeData(req, res);
    });
  });
});
// unit
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L2NvbnRyb2xsZXJzL2RhdGFDb250cm9sbGVyLnNwZWMuanMiXSwibmFtZXMiOlsibW9ja3MiLCJkYXRhU2VydmljZSIsInJlcSIsInJlcyIsImV4cGVjdGVkUHJvcGVydGllcyIsInBvc2l0aXZlUmVzcG9uc2UiLCJib2R5IiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwid3JpdGVEYXRhIiwib25jZSIsIndpdGhFeGFjdEFyZ3MiLCJyZXR1cm5zIiwic2V0QnVmZmVyZWRSZXNwb25zZSIsImZvckVhY2giLCJtb2NrIiwidmVyaWZ5Iiwic2hvdWxkIiwiaGF2ZSIsImFsbCIsImtleXMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRkE7QUFJQSxxQkFBUyxnQkFBVCxFQUEyQixZQUFNO0FBQy9CLE1BQ0VBLGNBREY7QUFBQSxNQUVFQyxvQkFGRjtBQUFBLE1BR0VDLFlBSEY7QUFBQSxNQUlFQyxZQUpGO0FBQUEsTUFLRUMsMkJBTEY7QUFBQSxNQU1FQyx5QkFORjs7QUFRQSxxQkFBTyxZQUFNO0FBQ1hILFVBQU07QUFDSkksWUFBTTtBQUNKQyxjQUFNO0FBREY7QUFERixLQUFOO0FBS0FILHlCQUFxQixDQUFDLFdBQUQsQ0FBckI7QUFDQUMsdUJBQW1CRyxRQUFRQyxPQUFSLENBQWdCLElBQWhCLENBQW5CO0FBQ0QsR0FSRDs7QUFVQSx5QkFBVyxZQUFNO0FBQ2ZOLFVBQU0sOEJBQU47QUFDQUYsa0JBQWMsNEJBQWQ7QUFDQUEsZ0JBQVlTLFNBQVosQ0FBc0JDLElBQXRCLEdBQTZCQyxhQUE3QixDQUEyQ1YsSUFBSUksSUFBSixDQUFTQyxJQUFwRCxFQUNHTSxPQURILENBQ1dSLGdCQURYO0FBRUFGLFFBQUlXLG1CQUFKLENBQXdCSCxJQUF4QixHQUErQkMsYUFBL0IsQ0FBNkNQLGdCQUE3QztBQUNELEdBTkQ7O0FBUUEsd0JBQVU7QUFBQSxXQUFNTCxNQUFNZSxPQUFOLENBQWM7QUFBQSxhQUFRQyxLQUFLQyxNQUFMLEVBQVI7QUFBQSxLQUFkLENBQU47QUFBQSxHQUFWOztBQUVBLHVCQUFTLDhCQUFULEVBQXlDLFlBQU07QUFDN0MsMkJBQVcsWUFBTTtBQUNmakIsY0FBUSxFQUFSO0FBQ0QsS0FGRDtBQUdBLG1CQUFHLHFDQUFILEVBQTBDO0FBQUEsYUFDeEMsOEJBQWUsRUFBRUMsd0JBQUYsRUFBZixFQUFnQ2lCLE1BQWhDLENBQXVDQyxJQUF2QyxDQUE0Q0MsR0FBNUMsQ0FBZ0RDLElBQWhELENBQXFEakIsa0JBQXJELENBRHdDO0FBQUEsS0FBMUM7QUFFRCxHQU5EOztBQVFBLHVCQUFTLG1CQUFULEVBQThCLFlBQU07QUFDbEMsMkJBQVcsWUFBTTtBQUNmSixjQUFRLENBQUNDLFlBQVlTLFNBQWIsRUFBd0JQLElBQUlXLG1CQUE1QixDQUFSO0FBQ0QsS0FGRDtBQUdBLG1CQUFHLGdDQUFILEVBQXFDO0FBQUEsYUFDbkMsOEJBQWUsRUFBRWIsd0JBQUYsRUFBZixFQUFnQ1MsU0FBaEMsQ0FBMENSLEdBQTFDLEVBQStDQyxHQUEvQyxDQURtQztBQUFBLEtBQXJDO0FBRUQsR0FORDtBQU9ELENBNUNEO0FBTkEiLCJmaWxlIjoiZGF0YUNvbnRyb2xsZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlc2NyaWJlLCBiZWZvcmUsIGJlZm9yZUVhY2gsIGFmdGVyRWFjaCwgaXQgfSBmcm9tICcuLy4uL3NldHVwJ1xuLy8gdW5pdFxuaW1wb3J0IGRhdGFDb250cm9sbGVyIGZyb20gJy4vLi4vLi4vbWFpbi9jb250cm9sbGVycy9kYXRhQ29udHJvbGxlcidcbi8vIG1vY2tzXG5pbXBvcnQgZGF0YVNlcnZpY2VNb2NrIGZyb20gJy4vLi4vbW9ja3Mvc2VydmljZXMvZGF0YVNlcnZpY2UnXG5pbXBvcnQgeyByZXNNb2NrIH0gZnJvbSAnLi8uLi9tb2Nrcy9saWIvd3JhcHBlcnMvZXhwcmVzc1dyYXBwZXInXG5cbmRlc2NyaWJlKCdEYXRhQ29udHJvbGxlcicsICgpID0+IHtcbiAgbGV0XG4gICAgbW9ja3MsXG4gICAgZGF0YVNlcnZpY2UsXG4gICAgcmVxLFxuICAgIHJlcyxcbiAgICBleHBlY3RlZFByb3BlcnRpZXMsXG4gICAgcG9zaXRpdmVSZXNwb25zZVxuXG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgcmVxID0ge1xuICAgICAgYm9keToge1xuICAgICAgICBkYXRhOiAneyBcImpzb25EYXRhXCI6IFwic29tZSBkYXRhXCJ9J1xuICAgICAgfVxuICAgIH1cbiAgICBleHBlY3RlZFByb3BlcnRpZXMgPSBbJ3dyaXRlRGF0YSddXG4gICAgcG9zaXRpdmVSZXNwb25zZSA9IFByb21pc2UucmVzb2x2ZSgnT0snKVxuICB9KVxuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHJlcyA9IHJlc01vY2soKVxuICAgIGRhdGFTZXJ2aWNlID0gZGF0YVNlcnZpY2VNb2NrKClcbiAgICBkYXRhU2VydmljZS53cml0ZURhdGEub25jZSgpLndpdGhFeGFjdEFyZ3MocmVxLmJvZHkuZGF0YSlcbiAgICAgIC5yZXR1cm5zKHBvc2l0aXZlUmVzcG9uc2UpXG4gICAgcmVzLnNldEJ1ZmZlcmVkUmVzcG9uc2Uub25jZSgpLndpdGhFeGFjdEFyZ3MocG9zaXRpdmVSZXNwb25zZSlcbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4gbW9ja3MuZm9yRWFjaChtb2NrID0+IG1vY2sudmVyaWZ5KCkpKVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGRhdGFDb250cm9sbGVyJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja3MgPSBbXVxuICAgIH0pXG4gICAgaXQoJ3Nob3VsZCBoYXZlIHRoZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgIGRhdGFDb250cm9sbGVyKHsgZGF0YVNlcnZpY2UgfSkuc2hvdWxkLmhhdmUuYWxsLmtleXMoZXhwZWN0ZWRQcm9wZXJ0aWVzKSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiB3cml0aW5nIGRhdGEnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrcyA9IFtkYXRhU2VydmljZS53cml0ZURhdGEsIHJlcy5zZXRCdWZmZXJlZFJlc3BvbnNlXVxuICAgIH0pXG4gICAgaXQoJ3Nob3VsZCB3cml0ZSBkYXRhIHN1Y2Nlc3NmdWxseScsICgpID0+XG4gICAgICBkYXRhQ29udHJvbGxlcih7IGRhdGFTZXJ2aWNlIH0pLndyaXRlRGF0YShyZXEsIHJlcykpXG4gIH0pXG59KVxuIl19