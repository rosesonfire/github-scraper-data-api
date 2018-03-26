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
      data = void 0,
      writeReq = void 0,
      readReq = void 0,
      res = void 0,
      expectedProperties = void 0,
      positiveResponse = void 0;

  (0, _setup.before)(function () {
    data = [{
      'author': {
        'uri': 'someUri',
        'name': 'someName',
        'location': {
          'city': 'someCIty',
          'zip': 1234
        }
      },
      'article': 'some article'
    }];
    writeReq = { body: { data: data } };
    readReq = { params: { key: 'someUri2' } };
    expectedProperties = ['writeData', 'readData'];
    positiveResponse = Promise.resolve('OK');
  });

  (0, _setup.beforeEach)(function () {
    res = (0, _expressWrapper.resMock)();
    dataService = (0, _dataService2.default)();
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
      dataService.writeData.once().withExactArgs(writeReq.body.data).returns(positiveResponse);
      res.setBufferedResponse.once().withExactArgs(positiveResponse);
      mocks = [dataService.writeData, res.setBufferedResponse];
    });

    (0, _setup.it)('should write data successfully', function () {
      return (0, _dataController2.default)({ dataService: dataService }).writeData(writeReq, res);
    });
  });

  (0, _setup.describe)('When reading data', function () {
    (0, _setup.beforeEach)(function () {
      dataService.readData.once().withExactArgs(readReq.params.key).returns(data[0]);
      res.setBufferedResponse.once().withExactArgs(data[0]);
      mocks = [dataService.readData, res.setBufferedResponse];
    });

    (0, _setup.it)('should read data successfully', function () {
      return (0, _dataController2.default)({ dataService: dataService }).readData(readReq, res);
    });
  });
});
// unit
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L2NvbnRyb2xsZXJzL2RhdGFDb250cm9sbGVyLnNwZWMuanMiXSwibmFtZXMiOlsibW9ja3MiLCJkYXRhU2VydmljZSIsImRhdGEiLCJ3cml0ZVJlcSIsInJlYWRSZXEiLCJyZXMiLCJleHBlY3RlZFByb3BlcnRpZXMiLCJwb3NpdGl2ZVJlc3BvbnNlIiwiYm9keSIsInBhcmFtcyIsImtleSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZm9yRWFjaCIsIm1vY2siLCJ2ZXJpZnkiLCJzaG91bGQiLCJoYXZlIiwiYWxsIiwia2V5cyIsIndyaXRlRGF0YSIsIm9uY2UiLCJ3aXRoRXhhY3RBcmdzIiwicmV0dXJucyIsInNldEJ1ZmZlcmVkUmVzcG9uc2UiLCJyZWFkRGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFGQTtBQUlBLHFCQUFTLGdCQUFULEVBQTJCLFlBQU07QUFDL0IsTUFDRUEsY0FERjtBQUFBLE1BRUVDLG9CQUZGO0FBQUEsTUFHRUMsYUFIRjtBQUFBLE1BSUVDLGlCQUpGO0FBQUEsTUFLRUMsZ0JBTEY7QUFBQSxNQU1FQyxZQU5GO0FBQUEsTUFPRUMsMkJBUEY7QUFBQSxNQVFFQyx5QkFSRjs7QUFVQSxxQkFBTyxZQUFNO0FBQ1hMLFdBQU8sQ0FDTDtBQUNFLGdCQUFVO0FBQ1IsZUFBTyxTQURDO0FBRVIsZ0JBQVEsVUFGQTtBQUdSLG9CQUFZO0FBQ1Ysa0JBQVEsVUFERTtBQUVWLGlCQUFPO0FBRkc7QUFISixPQURaO0FBU0UsaUJBQVc7QUFUYixLQURLLENBQVA7QUFhQUMsZUFBVyxFQUFFSyxNQUFNLEVBQUVOLFVBQUYsRUFBUixFQUFYO0FBQ0FFLGNBQVUsRUFBRUssUUFBUSxFQUFFQyxLQUFLLFVBQVAsRUFBVixFQUFWO0FBQ0FKLHlCQUFxQixDQUFDLFdBQUQsRUFBYyxVQUFkLENBQXJCO0FBQ0FDLHVCQUFtQkksUUFBUUMsT0FBUixDQUFnQixJQUFoQixDQUFuQjtBQUNELEdBbEJEOztBQW9CQSx5QkFBVyxZQUFNO0FBQ2ZQLFVBQU0sOEJBQU47QUFDQUosa0JBQWMsNEJBQWQ7QUFDRCxHQUhEOztBQUtBLHdCQUFVO0FBQUEsV0FBTUQsTUFBTWEsT0FBTixDQUFjO0FBQUEsYUFBUUMsS0FBS0MsTUFBTCxFQUFSO0FBQUEsS0FBZCxDQUFOO0FBQUEsR0FBVjs7QUFFQSx1QkFBUyw4QkFBVCxFQUF5QyxZQUFNO0FBQzdDLDJCQUFXLFlBQU07QUFDZmYsY0FBUSxFQUFSO0FBQ0QsS0FGRDs7QUFJQSxtQkFBRyxxQ0FBSCxFQUEwQztBQUFBLGFBQ3hDLDhCQUFlLEVBQUVDLHdCQUFGLEVBQWYsRUFBZ0NlLE1BQWhDLENBQXVDQyxJQUF2QyxDQUE0Q0MsR0FBNUMsQ0FBZ0RDLElBQWhELENBQXFEYixrQkFBckQsQ0FEd0M7QUFBQSxLQUExQztBQUVELEdBUEQ7O0FBU0EsdUJBQVMsbUJBQVQsRUFBOEIsWUFBTTtBQUNsQywyQkFBVyxZQUFNO0FBQ2ZMLGtCQUFZbUIsU0FBWixDQUFzQkMsSUFBdEIsR0FBNkJDLGFBQTdCLENBQTJDbkIsU0FBU0ssSUFBVCxDQUFjTixJQUF6RCxFQUNHcUIsT0FESCxDQUNXaEIsZ0JBRFg7QUFFQUYsVUFBSW1CLG1CQUFKLENBQXdCSCxJQUF4QixHQUErQkMsYUFBL0IsQ0FBNkNmLGdCQUE3QztBQUNBUCxjQUFRLENBQUNDLFlBQVltQixTQUFiLEVBQXdCZixJQUFJbUIsbUJBQTVCLENBQVI7QUFDRCxLQUxEOztBQU9BLG1CQUFHLGdDQUFILEVBQXFDO0FBQUEsYUFDbkMsOEJBQWUsRUFBRXZCLHdCQUFGLEVBQWYsRUFBZ0NtQixTQUFoQyxDQUEwQ2pCLFFBQTFDLEVBQW9ERSxHQUFwRCxDQURtQztBQUFBLEtBQXJDO0FBRUQsR0FWRDs7QUFZQSx1QkFBUyxtQkFBVCxFQUE4QixZQUFNO0FBQ2xDLDJCQUFXLFlBQU07QUFDZkosa0JBQVl3QixRQUFaLENBQXFCSixJQUFyQixHQUE0QkMsYUFBNUIsQ0FBMENsQixRQUFRSyxNQUFSLENBQWVDLEdBQXpELEVBQ0dhLE9BREgsQ0FDV3JCLEtBQUssQ0FBTCxDQURYO0FBRUFHLFVBQUltQixtQkFBSixDQUF3QkgsSUFBeEIsR0FBK0JDLGFBQS9CLENBQTZDcEIsS0FBSyxDQUFMLENBQTdDO0FBQ0FGLGNBQVEsQ0FBQ0MsWUFBWXdCLFFBQWIsRUFBdUJwQixJQUFJbUIsbUJBQTNCLENBQVI7QUFDRCxLQUxEOztBQU9BLG1CQUFHLCtCQUFILEVBQW9DO0FBQUEsYUFDbEMsOEJBQWUsRUFBRXZCLHdCQUFGLEVBQWYsRUFBZ0N3QixRQUFoQyxDQUF5Q3JCLE9BQXpDLEVBQWtEQyxHQUFsRCxDQURrQztBQUFBLEtBQXBDO0FBRUQsR0FWRDtBQVdELENBdEVEO0FBTkEiLCJmaWxlIjoiZGF0YUNvbnRyb2xsZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlc2NyaWJlLCBiZWZvcmUsIGJlZm9yZUVhY2gsIGFmdGVyRWFjaCwgaXQgfSBmcm9tICcuLy4uL3NldHVwJ1xuLy8gdW5pdFxuaW1wb3J0IGRhdGFDb250cm9sbGVyIGZyb20gJy4vLi4vLi4vbWFpbi9jb250cm9sbGVycy9kYXRhQ29udHJvbGxlcidcbi8vIG1vY2tzXG5pbXBvcnQgZGF0YVNlcnZpY2VNb2NrIGZyb20gJy4vLi4vbW9ja3Mvc2VydmljZXMvZGF0YVNlcnZpY2UnXG5pbXBvcnQgeyByZXNNb2NrIH0gZnJvbSAnLi8uLi9tb2Nrcy9saWIvd3JhcHBlcnMvZXhwcmVzc1dyYXBwZXInXG5cbmRlc2NyaWJlKCdEYXRhQ29udHJvbGxlcicsICgpID0+IHtcbiAgbGV0XG4gICAgbW9ja3MsXG4gICAgZGF0YVNlcnZpY2UsXG4gICAgZGF0YSxcbiAgICB3cml0ZVJlcSxcbiAgICByZWFkUmVxLFxuICAgIHJlcyxcbiAgICBleHBlY3RlZFByb3BlcnRpZXMsXG4gICAgcG9zaXRpdmVSZXNwb25zZVxuXG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgZGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgJ2F1dGhvcic6IHtcbiAgICAgICAgICAndXJpJzogJ3NvbWVVcmknLFxuICAgICAgICAgICduYW1lJzogJ3NvbWVOYW1lJyxcbiAgICAgICAgICAnbG9jYXRpb24nOiB7XG4gICAgICAgICAgICAnY2l0eSc6ICdzb21lQ0l0eScsXG4gICAgICAgICAgICAnemlwJzogMTIzNFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ2FydGljbGUnOiAnc29tZSBhcnRpY2xlJ1xuICAgICAgfVxuICAgIF1cbiAgICB3cml0ZVJlcSA9IHsgYm9keTogeyBkYXRhIH0gfVxuICAgIHJlYWRSZXEgPSB7IHBhcmFtczogeyBrZXk6ICdzb21lVXJpMicgfSB9XG4gICAgZXhwZWN0ZWRQcm9wZXJ0aWVzID0gWyd3cml0ZURhdGEnLCAncmVhZERhdGEnXVxuICAgIHBvc2l0aXZlUmVzcG9uc2UgPSBQcm9taXNlLnJlc29sdmUoJ09LJylcbiAgfSlcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZXMgPSByZXNNb2NrKClcbiAgICBkYXRhU2VydmljZSA9IGRhdGFTZXJ2aWNlTW9jaygpXG4gIH0pXG5cbiAgYWZ0ZXJFYWNoKCgpID0+IG1vY2tzLmZvckVhY2gobW9jayA9PiBtb2NrLnZlcmlmeSgpKSlcblxuICBkZXNjcmliZSgnV2hlbiBjcmVhdGluZyBkYXRhQ29udHJvbGxlcicsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tzID0gW11cbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIHRoZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgIGRhdGFDb250cm9sbGVyKHsgZGF0YVNlcnZpY2UgfSkuc2hvdWxkLmhhdmUuYWxsLmtleXMoZXhwZWN0ZWRQcm9wZXJ0aWVzKSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiB3cml0aW5nIGRhdGEnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBkYXRhU2VydmljZS53cml0ZURhdGEub25jZSgpLndpdGhFeGFjdEFyZ3Mod3JpdGVSZXEuYm9keS5kYXRhKVxuICAgICAgICAucmV0dXJucyhwb3NpdGl2ZVJlc3BvbnNlKVxuICAgICAgcmVzLnNldEJ1ZmZlcmVkUmVzcG9uc2Uub25jZSgpLndpdGhFeGFjdEFyZ3MocG9zaXRpdmVSZXNwb25zZSlcbiAgICAgIG1vY2tzID0gW2RhdGFTZXJ2aWNlLndyaXRlRGF0YSwgcmVzLnNldEJ1ZmZlcmVkUmVzcG9uc2VdXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgd3JpdGUgZGF0YSBzdWNjZXNzZnVsbHknLCAoKSA9PlxuICAgICAgZGF0YUNvbnRyb2xsZXIoeyBkYXRhU2VydmljZSB9KS53cml0ZURhdGEod3JpdGVSZXEsIHJlcykpXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gcmVhZGluZyBkYXRhJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgZGF0YVNlcnZpY2UucmVhZERhdGEub25jZSgpLndpdGhFeGFjdEFyZ3MocmVhZFJlcS5wYXJhbXMua2V5KVxuICAgICAgICAucmV0dXJucyhkYXRhWzBdKVxuICAgICAgcmVzLnNldEJ1ZmZlcmVkUmVzcG9uc2Uub25jZSgpLndpdGhFeGFjdEFyZ3MoZGF0YVswXSlcbiAgICAgIG1vY2tzID0gW2RhdGFTZXJ2aWNlLnJlYWREYXRhLCByZXMuc2V0QnVmZmVyZWRSZXNwb25zZV1cbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCByZWFkIGRhdGEgc3VjY2Vzc2Z1bGx5JywgKCkgPT5cbiAgICAgIGRhdGFDb250cm9sbGVyKHsgZGF0YVNlcnZpY2UgfSkucmVhZERhdGEocmVhZFJlcSwgcmVzKSlcbiAgfSlcbn0pXG4iXX0=