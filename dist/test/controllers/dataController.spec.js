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
    readReq = { body: { data: { key: 'someUri2' } } };
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
      dataService.readData.once().withExactArgs(readReq.body.data.key).returns(data[0]);
      res.setBufferedResponse.once().withExactArgs(data[0]);
      mocks = [dataService.readData, res.setBufferedResponse];
    });

    (0, _setup.it)('should read data successfully', function () {
      return (0, _dataController2.default)({ dataService: dataService }).readData(readReq, res);
    });
  });
});
// unit
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L2NvbnRyb2xsZXJzL2RhdGFDb250cm9sbGVyLnNwZWMuanMiXSwibmFtZXMiOlsibW9ja3MiLCJkYXRhU2VydmljZSIsImRhdGEiLCJ3cml0ZVJlcSIsInJlYWRSZXEiLCJyZXMiLCJleHBlY3RlZFByb3BlcnRpZXMiLCJwb3NpdGl2ZVJlc3BvbnNlIiwiYm9keSIsImtleSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZm9yRWFjaCIsIm1vY2siLCJ2ZXJpZnkiLCJzaG91bGQiLCJoYXZlIiwiYWxsIiwia2V5cyIsIndyaXRlRGF0YSIsIm9uY2UiLCJ3aXRoRXhhY3RBcmdzIiwicmV0dXJucyIsInNldEJ1ZmZlcmVkUmVzcG9uc2UiLCJyZWFkRGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFGQTtBQUlBLHFCQUFTLGdCQUFULEVBQTJCLFlBQU07QUFDL0IsTUFDRUEsY0FERjtBQUFBLE1BRUVDLG9CQUZGO0FBQUEsTUFHRUMsYUFIRjtBQUFBLE1BSUVDLGlCQUpGO0FBQUEsTUFLRUMsZ0JBTEY7QUFBQSxNQU1FQyxZQU5GO0FBQUEsTUFPRUMsMkJBUEY7QUFBQSxNQVFFQyx5QkFSRjs7QUFVQSxxQkFBTyxZQUFNO0FBQ1hMLFdBQU8sQ0FDTDtBQUNFLGdCQUFVO0FBQ1IsZUFBTyxTQURDO0FBRVIsZ0JBQVEsVUFGQTtBQUdSLG9CQUFZO0FBQ1Ysa0JBQVEsVUFERTtBQUVWLGlCQUFPO0FBRkc7QUFISixPQURaO0FBU0UsaUJBQVc7QUFUYixLQURLLENBQVA7QUFhQUMsZUFBVyxFQUFFSyxNQUFNLEVBQUVOLFVBQUYsRUFBUixFQUFYO0FBQ0FFLGNBQVUsRUFBRUksTUFBTSxFQUFFTixNQUFNLEVBQUVPLEtBQUssVUFBUCxFQUFSLEVBQVIsRUFBVjtBQUNBSCx5QkFBcUIsQ0FBQyxXQUFELEVBQWMsVUFBZCxDQUFyQjtBQUNBQyx1QkFBbUJHLFFBQVFDLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBbkI7QUFDRCxHQWxCRDs7QUFvQkEseUJBQVcsWUFBTTtBQUNmTixVQUFNLDhCQUFOO0FBQ0FKLGtCQUFjLDRCQUFkO0FBQ0QsR0FIRDs7QUFLQSx3QkFBVTtBQUFBLFdBQU1ELE1BQU1ZLE9BQU4sQ0FBYztBQUFBLGFBQVFDLEtBQUtDLE1BQUwsRUFBUjtBQUFBLEtBQWQsQ0FBTjtBQUFBLEdBQVY7O0FBRUEsdUJBQVMsOEJBQVQsRUFBeUMsWUFBTTtBQUM3QywyQkFBVyxZQUFNO0FBQ2ZkLGNBQVEsRUFBUjtBQUNELEtBRkQ7O0FBSUEsbUJBQUcscUNBQUgsRUFBMEM7QUFBQSxhQUN4Qyw4QkFBZSxFQUFFQyx3QkFBRixFQUFmLEVBQWdDYyxNQUFoQyxDQUF1Q0MsSUFBdkMsQ0FBNENDLEdBQTVDLENBQWdEQyxJQUFoRCxDQUFxRFosa0JBQXJELENBRHdDO0FBQUEsS0FBMUM7QUFFRCxHQVBEOztBQVNBLHVCQUFTLG1CQUFULEVBQThCLFlBQU07QUFDbEMsMkJBQVcsWUFBTTtBQUNmTCxrQkFBWWtCLFNBQVosQ0FBc0JDLElBQXRCLEdBQTZCQyxhQUE3QixDQUEyQ2xCLFNBQVNLLElBQVQsQ0FBY04sSUFBekQsRUFDR29CLE9BREgsQ0FDV2YsZ0JBRFg7QUFFQUYsVUFBSWtCLG1CQUFKLENBQXdCSCxJQUF4QixHQUErQkMsYUFBL0IsQ0FBNkNkLGdCQUE3QztBQUNBUCxjQUFRLENBQUNDLFlBQVlrQixTQUFiLEVBQXdCZCxJQUFJa0IsbUJBQTVCLENBQVI7QUFDRCxLQUxEOztBQU9BLG1CQUFHLGdDQUFILEVBQXFDO0FBQUEsYUFDbkMsOEJBQWUsRUFBRXRCLHdCQUFGLEVBQWYsRUFBZ0NrQixTQUFoQyxDQUEwQ2hCLFFBQTFDLEVBQW9ERSxHQUFwRCxDQURtQztBQUFBLEtBQXJDO0FBRUQsR0FWRDs7QUFZQSx1QkFBUyxtQkFBVCxFQUE4QixZQUFNO0FBQ2xDLDJCQUFXLFlBQU07QUFDZkosa0JBQVl1QixRQUFaLENBQXFCSixJQUFyQixHQUE0QkMsYUFBNUIsQ0FBMENqQixRQUFRSSxJQUFSLENBQWFOLElBQWIsQ0FBa0JPLEdBQTVELEVBQ0dhLE9BREgsQ0FDV3BCLEtBQUssQ0FBTCxDQURYO0FBRUFHLFVBQUlrQixtQkFBSixDQUF3QkgsSUFBeEIsR0FBK0JDLGFBQS9CLENBQTZDbkIsS0FBSyxDQUFMLENBQTdDO0FBQ0FGLGNBQVEsQ0FBQ0MsWUFBWXVCLFFBQWIsRUFBdUJuQixJQUFJa0IsbUJBQTNCLENBQVI7QUFDRCxLQUxEOztBQU9BLG1CQUFHLCtCQUFILEVBQW9DO0FBQUEsYUFDbEMsOEJBQWUsRUFBRXRCLHdCQUFGLEVBQWYsRUFBZ0N1QixRQUFoQyxDQUF5Q3BCLE9BQXpDLEVBQWtEQyxHQUFsRCxDQURrQztBQUFBLEtBQXBDO0FBRUQsR0FWRDtBQVdELENBdEVEO0FBTkEiLCJmaWxlIjoiZGF0YUNvbnRyb2xsZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlc2NyaWJlLCBiZWZvcmUsIGJlZm9yZUVhY2gsIGFmdGVyRWFjaCwgaXQgfSBmcm9tICcuLy4uL3NldHVwJ1xuLy8gdW5pdFxuaW1wb3J0IGRhdGFDb250cm9sbGVyIGZyb20gJy4vLi4vLi4vbWFpbi9jb250cm9sbGVycy9kYXRhQ29udHJvbGxlcidcbi8vIG1vY2tzXG5pbXBvcnQgZGF0YVNlcnZpY2VNb2NrIGZyb20gJy4vLi4vbW9ja3Mvc2VydmljZXMvZGF0YVNlcnZpY2UnXG5pbXBvcnQgeyByZXNNb2NrIH0gZnJvbSAnLi8uLi9tb2Nrcy9saWIvd3JhcHBlcnMvZXhwcmVzc1dyYXBwZXInXG5cbmRlc2NyaWJlKCdEYXRhQ29udHJvbGxlcicsICgpID0+IHtcbiAgbGV0XG4gICAgbW9ja3MsXG4gICAgZGF0YVNlcnZpY2UsXG4gICAgZGF0YSxcbiAgICB3cml0ZVJlcSxcbiAgICByZWFkUmVxLFxuICAgIHJlcyxcbiAgICBleHBlY3RlZFByb3BlcnRpZXMsXG4gICAgcG9zaXRpdmVSZXNwb25zZVxuXG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgZGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgJ2F1dGhvcic6IHtcbiAgICAgICAgICAndXJpJzogJ3NvbWVVcmknLFxuICAgICAgICAgICduYW1lJzogJ3NvbWVOYW1lJyxcbiAgICAgICAgICAnbG9jYXRpb24nOiB7XG4gICAgICAgICAgICAnY2l0eSc6ICdzb21lQ0l0eScsXG4gICAgICAgICAgICAnemlwJzogMTIzNFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ2FydGljbGUnOiAnc29tZSBhcnRpY2xlJ1xuICAgICAgfVxuICAgIF1cbiAgICB3cml0ZVJlcSA9IHsgYm9keTogeyBkYXRhIH0gfVxuICAgIHJlYWRSZXEgPSB7IGJvZHk6IHsgZGF0YTogeyBrZXk6ICdzb21lVXJpMicgfSB9IH1cbiAgICBleHBlY3RlZFByb3BlcnRpZXMgPSBbJ3dyaXRlRGF0YScsICdyZWFkRGF0YSddXG4gICAgcG9zaXRpdmVSZXNwb25zZSA9IFByb21pc2UucmVzb2x2ZSgnT0snKVxuICB9KVxuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHJlcyA9IHJlc01vY2soKVxuICAgIGRhdGFTZXJ2aWNlID0gZGF0YVNlcnZpY2VNb2NrKClcbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4gbW9ja3MuZm9yRWFjaChtb2NrID0+IG1vY2sudmVyaWZ5KCkpKVxuXG4gIGRlc2NyaWJlKCdXaGVuIGNyZWF0aW5nIGRhdGFDb250cm9sbGVyJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja3MgPSBbXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgdGhlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgZGF0YUNvbnRyb2xsZXIoeyBkYXRhU2VydmljZSB9KS5zaG91bGQuaGF2ZS5hbGwua2V5cyhleHBlY3RlZFByb3BlcnRpZXMpKVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIHdyaXRpbmcgZGF0YScsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGRhdGFTZXJ2aWNlLndyaXRlRGF0YS5vbmNlKCkud2l0aEV4YWN0QXJncyh3cml0ZVJlcS5ib2R5LmRhdGEpXG4gICAgICAgIC5yZXR1cm5zKHBvc2l0aXZlUmVzcG9uc2UpXG4gICAgICByZXMuc2V0QnVmZmVyZWRSZXNwb25zZS5vbmNlKCkud2l0aEV4YWN0QXJncyhwb3NpdGl2ZVJlc3BvbnNlKVxuICAgICAgbW9ja3MgPSBbZGF0YVNlcnZpY2Uud3JpdGVEYXRhLCByZXMuc2V0QnVmZmVyZWRSZXNwb25zZV1cbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCB3cml0ZSBkYXRhIHN1Y2Nlc3NmdWxseScsICgpID0+XG4gICAgICBkYXRhQ29udHJvbGxlcih7IGRhdGFTZXJ2aWNlIH0pLndyaXRlRGF0YSh3cml0ZVJlcSwgcmVzKSlcbiAgfSlcblxuICBkZXNjcmliZSgnV2hlbiByZWFkaW5nIGRhdGEnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBkYXRhU2VydmljZS5yZWFkRGF0YS5vbmNlKCkud2l0aEV4YWN0QXJncyhyZWFkUmVxLmJvZHkuZGF0YS5rZXkpXG4gICAgICAgIC5yZXR1cm5zKGRhdGFbMF0pXG4gICAgICByZXMuc2V0QnVmZmVyZWRSZXNwb25zZS5vbmNlKCkud2l0aEV4YWN0QXJncyhkYXRhWzBdKVxuICAgICAgbW9ja3MgPSBbZGF0YVNlcnZpY2UucmVhZERhdGEsIHJlcy5zZXRCdWZmZXJlZFJlc3BvbnNlXVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHJlYWQgZGF0YSBzdWNjZXNzZnVsbHknLCAoKSA9PlxuICAgICAgZGF0YUNvbnRyb2xsZXIoeyBkYXRhU2VydmljZSB9KS5yZWFkRGF0YShyZWFkUmVxLCByZXMpKVxuICB9KVxufSlcbiJdfQ==