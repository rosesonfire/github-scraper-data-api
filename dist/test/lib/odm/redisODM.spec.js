'use strict';

var _jsUtils = require('js-utils');

var _setup = require('./../../setup');

var _redisODM = require('./../../../main/lib/odm/redisODM');

var _redisODM2 = _interopRequireDefault(_redisODM);

var _redisClientWrapper = require('./../../mocks/lib/wrappers/redisClientWrapper');

var _redisClientWrapper2 = _interopRequireDefault(_redisClientWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// unit

// mocks


(0, _setup.describe)('RedisODM', function () {
  var mocks = void 0,
      redisClient = void 0,
      expectedODMProperties = void 0,
      expectedModelObjProperties = void 0,
      data = void 0,
      dataWithColonInAKey = void 0,
      dataWithArray = void 0,
      flattenedData = void 0,
      hgetallResponse = void 0,
      positiveReply = void 0,
      noColonInKeyErrorMsg = void 0,
      noArrayAsValueErrorMsg = void 0,
      keyNotFoundErrorMsg = void 0,
      redisClientFailErrorMsg = void 0;

  (0, _setup.before)(function () {
    expectedODMProperties = ['create', 'get'];
    expectedModelObjProperties = ['key', 'data', 'save'];
    data = {
      id: 126,
      name: 'someName',
      entry: {
        id: 78,
        value: 45,
        description: {
          'date': new Date(Date.parse('2018-03-01T23:58:35Z')),
          'location': 'someLocation'
        }
      },
      meta: {
        meta1: 'hello',
        meta2: true
      }
    };
    dataWithColonInAKey = {
      id: 3,
      'value:withcolon': 'somevalue'
    };
    dataWithArray = {
      id: 3,
      value: ['somevalue']
    };
    flattenedData = [126, 'id', 126, 'name', 'someName', 'entry:id', 78, 'entry:value', 45, 'entry:description:date', new Date(Date.parse('2018-03-01T23:58:35Z')), 'entry:description:location', 'someLocation', 'meta:meta1', 'hello', 'meta:meta2', true];
    hgetallResponse = {
      'id': 126,
      'name': 'someName',
      'entry:id': 78,
      'entry:value': 45,
      'entry:description:date': new Date(Date.parse('2018-03-01T23:58:35Z')),
      'entry:description:location': 'someLocation',
      'meta:meta1': 'hello',
      'meta:meta2': true
    };
    positiveReply = 'OK';
    noColonInKeyErrorMsg = 'Occurence of ":" in key is not supported';
    noArrayAsValueErrorMsg = 'Array as value is not supported';
    keyNotFoundErrorMsg = 'Could not find data matching the provided key (' + data.id + ')';
    redisClientFailErrorMsg = 'err';
  });

  (0, _setup.beforeEach)(function () {
    redisClient = (0, _redisClientWrapper2.default)();
  });

  (0, _setup.afterEach)(function () {
    return mocks.forEach(function (mock) {
      return mock.verify();
    });
  });

  (0, _setup.describe)('When creating redisODM', function () {
    (0, _setup.beforeEach)(function () {
      mocks = [];
    });

    (0, _setup.it)('should have expected properties', function () {
      return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).should.have.all.keys(expectedODMProperties);
    });

    (0, _setup.describe)('When creating a model object', function () {
      (0, _setup.it)('should have expected properties', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: data }).should.have.all.keys(expectedModelObjProperties);
      });

      (0, _setup.it)('should map the data properly', function () {
        var modelObj = (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: data });

        modelObj.key.should.equal(data.id);
        modelObj.data.should.equal(data);
      });
    });

    (0, _setup.describe)('When creating a model object with colon in a key', function () {
      (0, _setup.it)('should fail', function () {
        try {
          (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: dataWithColonInAKey.id, data: dataWithColonInAKey });
          '1'.should.equal('2');
        } catch (e) {
          e.message.should.equal(noColonInKeyErrorMsg);
        }
      });
    });

    (0, _setup.describe)('When creating a model object with array as a value', function () {
      (0, _setup.it)('should fail', function () {
        try {
          (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: dataWithArray });
          '1'.should.equal('2');
        } catch (e) {
          e.message.should.equal(noArrayAsValueErrorMsg);
        }
      });
    });
  });

  (0, _setup.describe)('When getting a model object', function () {
    (0, _setup.beforeEach)(function () {
      mocks = [redisClient.hgetall];
    });

    (0, _setup.describe)('When key exists', function () {
      (0, _setup.beforeEach)(function () {
        redisClient.hgetall.once().withExactArgs(data.id).resolves(hgetallResponse);
      });

      (0, _setup.it)('should return a promise', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id).should.be.a('promise');
      });

      (0, _setup.it)('should have expected properties', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id).should.eventually.have.all.keys(expectedModelObjProperties);
      });

      (0, _setup.it)('should map the data properly', async function () {
        var modelObj = await (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id);

        modelObj.key.should.equal(data.id);
        JSON.stringify(modelObj.data).should.equal(JSON.stringify(data));
      });
    });

    (0, _setup.describe)('When key does not exist', function () {
      (0, _setup.beforeEach)(function () {
        redisClient.hgetall.once().withExactArgs(data.id).resolves(null);
      });

      (0, _setup.it)('should fail', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id).then(function (response) {
          return '1'.should.equal('2');
        }).catch(function (err) {
          return err.message.should.equal(keyNotFoundErrorMsg);
        });
      });
    });

    (0, _setup.describe)('When underlying redisClient fails', function () {
      (0, _setup.beforeEach)(function () {
        redisClient.hgetall.once().withExactArgs(data.id).rejects(new Error(redisClientFailErrorMsg));
      });

      (0, _setup.it)('should fail', function () {
        return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).get(data.id).then(function (response) {
          return '1'.should.equal('2');
        }).catch(function (err) {
          return err.message.should.equal(redisClientFailErrorMsg);
        });
      });
    });
  });

  (0, _setup.describe)('When saving a model object', function () {
    (0, _setup.beforeEach)(function () {
      var _redisClient$hmset$on;

      (_redisClient$hmset$on = redisClient.hmset.once()).withExactArgs.apply(_redisClient$hmset$on, _toConsumableArray(flattenedData)).resolves(positiveReply);
      mocks = [redisClient.hmset];
    });

    (0, _setup.it)('should return a promise', function () {
      return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: data }).save().should.be.a('promise');
    });

    (0, _setup.it)('should be successful', function () {
      return (0, _redisODM2.default)({ redisClient: redisClient, utils: _jsUtils.utils }).create({ key: data.id, data: data }).save().should.eventually.equal(positiveReply);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi9vZG0vcmVkaXNPRE0uc3BlYy5qcyJdLCJuYW1lcyI6WyJtb2NrcyIsInJlZGlzQ2xpZW50IiwiZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzIiwiZXhwZWN0ZWRNb2RlbE9ialByb3BlcnRpZXMiLCJkYXRhIiwiZGF0YVdpdGhDb2xvbkluQUtleSIsImRhdGFXaXRoQXJyYXkiLCJmbGF0dGVuZWREYXRhIiwiaGdldGFsbFJlc3BvbnNlIiwicG9zaXRpdmVSZXBseSIsIm5vQ29sb25JbktleUVycm9yTXNnIiwibm9BcnJheUFzVmFsdWVFcnJvck1zZyIsImtleU5vdEZvdW5kRXJyb3JNc2ciLCJyZWRpc0NsaWVudEZhaWxFcnJvck1zZyIsImlkIiwibmFtZSIsImVudHJ5IiwidmFsdWUiLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJwYXJzZSIsIm1ldGEiLCJtZXRhMSIsIm1ldGEyIiwiZm9yRWFjaCIsIm1vY2siLCJ2ZXJpZnkiLCJ1dGlscyIsInNob3VsZCIsImhhdmUiLCJhbGwiLCJrZXlzIiwiY3JlYXRlIiwia2V5IiwibW9kZWxPYmoiLCJlcXVhbCIsImUiLCJtZXNzYWdlIiwiaGdldGFsbCIsIm9uY2UiLCJ3aXRoRXhhY3RBcmdzIiwicmVzb2x2ZXMiLCJnZXQiLCJiZSIsImEiLCJldmVudHVhbGx5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJjYXRjaCIsImVyciIsInJlamVjdHMiLCJFcnJvciIsImhtc2V0Iiwic2F2ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFFQTs7OztBQUVBOzs7Ozs7O0FBSEE7O0FBRUE7OztBQUlBLHFCQUFTLFVBQVQsRUFBcUIsWUFBTTtBQUN6QixNQUNFQSxjQURGO0FBQUEsTUFFRUMsb0JBRkY7QUFBQSxNQUdFQyw4QkFIRjtBQUFBLE1BSUVDLG1DQUpGO0FBQUEsTUFLRUMsYUFMRjtBQUFBLE1BTUVDLDRCQU5GO0FBQUEsTUFPRUMsc0JBUEY7QUFBQSxNQVFFQyxzQkFSRjtBQUFBLE1BU0VDLHdCQVRGO0FBQUEsTUFVRUMsc0JBVkY7QUFBQSxNQVdFQyw2QkFYRjtBQUFBLE1BWUVDLCtCQVpGO0FBQUEsTUFhRUMsNEJBYkY7QUFBQSxNQWNFQyxnQ0FkRjs7QUFnQkEscUJBQU8sWUFBTTtBQUNYWCw0QkFBd0IsQ0FBQyxRQUFELEVBQVcsS0FBWCxDQUF4QjtBQUNBQyxpQ0FBNkIsQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixNQUFoQixDQUE3QjtBQUNBQyxXQUFPO0FBQ0xVLFVBQUksR0FEQztBQUVMQyxZQUFNLFVBRkQ7QUFHTEMsYUFBTztBQUNMRixZQUFJLEVBREM7QUFFTEcsZUFBTyxFQUZGO0FBR0xDLHFCQUFhO0FBQ1gsa0JBQVEsSUFBSUMsSUFBSixDQUFTQSxLQUFLQyxLQUFMLENBQVcsc0JBQVgsQ0FBVCxDQURHO0FBRVgsc0JBQVk7QUFGRDtBQUhSLE9BSEY7QUFXTEMsWUFBTTtBQUNKQyxlQUFPLE9BREg7QUFFSkMsZUFBTztBQUZIO0FBWEQsS0FBUDtBQWdCQWxCLDBCQUFzQjtBQUNwQlMsVUFBSSxDQURnQjtBQUVwQix5QkFBbUI7QUFGQyxLQUF0QjtBQUlBUixvQkFBZ0I7QUFDZFEsVUFBSSxDQURVO0FBRWRHLGFBQU8sQ0FBQyxXQUFEO0FBRk8sS0FBaEI7QUFJQVYsb0JBQWdCLENBQUMsR0FBRCxFQUFNLElBQU4sRUFBWSxHQUFaLEVBQWlCLE1BQWpCLEVBQXlCLFVBQXpCLEVBQXFDLFVBQXJDLEVBQWlELEVBQWpELEVBQ2QsYUFEYyxFQUNDLEVBREQsRUFDSyx3QkFETCxFQUVkLElBQUlZLElBQUosQ0FBU0EsS0FBS0MsS0FBTCxDQUFXLHNCQUFYLENBQVQsQ0FGYyxFQUdkLDRCQUhjLEVBR2dCLGNBSGhCLEVBR2dDLFlBSGhDLEVBRzhDLE9BSDlDLEVBSWQsWUFKYyxFQUlBLElBSkEsQ0FBaEI7QUFLQVosc0JBQWtCO0FBQ2hCLFlBQU0sR0FEVTtBQUVoQixjQUFRLFVBRlE7QUFHaEIsa0JBQVksRUFISTtBQUloQixxQkFBZSxFQUpDO0FBS2hCLGdDQUEwQixJQUFJVyxJQUFKLENBQVNBLEtBQUtDLEtBQUwsQ0FBVyxzQkFBWCxDQUFULENBTFY7QUFNaEIsb0NBQThCLGNBTmQ7QUFPaEIsb0JBQWMsT0FQRTtBQVFoQixvQkFBYztBQVJFLEtBQWxCO0FBVUFYLG9CQUFnQixJQUFoQjtBQUNBQywyQkFBdUIsMENBQXZCO0FBQ0FDLDZCQUF5QixpQ0FBekI7QUFDQUMsOEVBQ29EUixLQUFLVSxFQUR6RDtBQUVBRCw4QkFBMEIsS0FBMUI7QUFDRCxHQWhERDs7QUFrREEseUJBQVcsWUFBTTtBQUNmWixrQkFBYyxtQ0FBZDtBQUNELEdBRkQ7O0FBSUEsd0JBQVU7QUFBQSxXQUFNRCxNQUFNd0IsT0FBTixDQUFjO0FBQUEsYUFBUUMsS0FBS0MsTUFBTCxFQUFSO0FBQUEsS0FBZCxDQUFOO0FBQUEsR0FBVjs7QUFFQSx1QkFBUyx3QkFBVCxFQUFtQyxZQUFNO0FBQ3ZDLDJCQUFXLFlBQU07QUFDZjFCLGNBQVEsRUFBUjtBQUNELEtBRkQ7O0FBSUEsbUJBQUcsaUNBQUgsRUFBc0M7QUFBQSxhQUNwQyx3QkFBUyxFQUFFQyx3QkFBRixFQUFlMEIscUJBQWYsRUFBVCxFQUFpQ0MsTUFBakMsQ0FBd0NDLElBQXhDLENBQTZDQyxHQUE3QyxDQUNHQyxJQURILENBQ1E3QixxQkFEUixDQURvQztBQUFBLEtBQXRDOztBQUlBLHlCQUFTLDhCQUFULEVBQXlDLFlBQU07QUFDN0MscUJBQUcsaUNBQUgsRUFBc0M7QUFBQSxlQUNwQyx3QkFBUyxFQUFFRCx3QkFBRixFQUFlMEIscUJBQWYsRUFBVCxFQUNHSyxNQURILENBQ1UsRUFBRUMsS0FBSzdCLEtBQUtVLEVBQVosRUFBZ0JWLFVBQWhCLEVBRFYsRUFDa0N3QixNQURsQyxDQUN5Q0MsSUFEekMsQ0FDOENDLEdBRDlDLENBRUdDLElBRkgsQ0FFUTVCLDBCQUZSLENBRG9DO0FBQUEsT0FBdEM7O0FBS0EscUJBQUcsOEJBQUgsRUFBbUMsWUFBTTtBQUN2QyxZQUFNK0IsV0FBVyx3QkFBUyxFQUFFakMsd0JBQUYsRUFBZTBCLHFCQUFmLEVBQVQsRUFDZEssTUFEYyxDQUNQLEVBQUVDLEtBQUs3QixLQUFLVSxFQUFaLEVBQWdCVixVQUFoQixFQURPLENBQWpCOztBQUdBOEIsaUJBQVNELEdBQVQsQ0FBYUwsTUFBYixDQUFvQk8sS0FBcEIsQ0FBMEIvQixLQUFLVSxFQUEvQjtBQUNBb0IsaUJBQVM5QixJQUFULENBQWN3QixNQUFkLENBQXFCTyxLQUFyQixDQUEyQi9CLElBQTNCO0FBQ0QsT0FORDtBQU9ELEtBYkQ7O0FBZUEseUJBQVMsa0RBQVQsRUFBNkQsWUFBTTtBQUNqRSxxQkFBRyxhQUFILEVBQWtCLFlBQU07QUFDdEIsWUFBSTtBQUNGLGtDQUFTLEVBQUVILHdCQUFGLEVBQWUwQixxQkFBZixFQUFULEVBQ0dLLE1BREgsQ0FDVSxFQUFFQyxLQUFLNUIsb0JBQW9CUyxFQUEzQixFQUErQlYsTUFBTUMsbUJBQXJDLEVBRFY7QUFFQSxjQUFJdUIsTUFBSixDQUFXTyxLQUFYLENBQWlCLEdBQWpCO0FBQ0QsU0FKRCxDQUlFLE9BQU9DLENBQVAsRUFBVTtBQUNWQSxZQUFFQyxPQUFGLENBQVVULE1BQVYsQ0FDR08sS0FESCxDQUNTekIsb0JBRFQ7QUFFRDtBQUNGLE9BVEQ7QUFVRCxLQVhEOztBQWFBLHlCQUFTLG9EQUFULEVBQStELFlBQU07QUFDbkUscUJBQUcsYUFBSCxFQUFrQixZQUFNO0FBQ3RCLFlBQUk7QUFDRixrQ0FBUyxFQUFFVCx3QkFBRixFQUFlMEIscUJBQWYsRUFBVCxFQUNHSyxNQURILENBQ1UsRUFBRUMsS0FBSzdCLEtBQUtVLEVBQVosRUFBZ0JWLE1BQU1FLGFBQXRCLEVBRFY7QUFFQSxjQUFJc0IsTUFBSixDQUFXTyxLQUFYLENBQWlCLEdBQWpCO0FBQ0QsU0FKRCxDQUlFLE9BQU9DLENBQVAsRUFBVTtBQUNWQSxZQUFFQyxPQUFGLENBQVVULE1BQVYsQ0FDR08sS0FESCxDQUNTeEIsc0JBRFQ7QUFFRDtBQUNGLE9BVEQ7QUFVRCxLQVhEO0FBWUQsR0FqREQ7O0FBbURBLHVCQUFTLDZCQUFULEVBQXdDLFlBQU07QUFDNUMsMkJBQVcsWUFBTTtBQUNmWCxjQUFRLENBQUVDLFlBQVlxQyxPQUFkLENBQVI7QUFDRCxLQUZEOztBQUlBLHlCQUFTLGlCQUFULEVBQTRCLFlBQU07QUFDaEMsNkJBQVcsWUFBTTtBQUNmckMsb0JBQVlxQyxPQUFaLENBQW9CQyxJQUFwQixHQUEyQkMsYUFBM0IsQ0FBeUNwQyxLQUFLVSxFQUE5QyxFQUNHMkIsUUFESCxDQUNZakMsZUFEWjtBQUVELE9BSEQ7O0FBS0EscUJBQUcseUJBQUgsRUFBOEI7QUFBQSxlQUM1Qix3QkFBUyxFQUFFUCx3QkFBRixFQUFlMEIscUJBQWYsRUFBVCxFQUFpQ2UsR0FBakMsQ0FBcUN0QyxLQUFLVSxFQUExQyxFQUE4Q2MsTUFBOUMsQ0FBcURlLEVBQXJELENBQXdEQyxDQUF4RCxDQUEwRCxTQUExRCxDQUQ0QjtBQUFBLE9BQTlCOztBQUdBLHFCQUFHLGlDQUFILEVBQXNDO0FBQUEsZUFDcEMsd0JBQVMsRUFBRTNDLHdCQUFGLEVBQWUwQixxQkFBZixFQUFULEVBQWlDZSxHQUFqQyxDQUFxQ3RDLEtBQUtVLEVBQTFDLEVBQ0djLE1BREgsQ0FDVWlCLFVBRFYsQ0FDcUJoQixJQURyQixDQUMwQkMsR0FEMUIsQ0FDOEJDLElBRDlCLENBQ21DNUIsMEJBRG5DLENBRG9DO0FBQUEsT0FBdEM7O0FBSUEscUJBQUcsOEJBQUgsRUFBbUMsa0JBQVk7QUFDN0MsWUFBTStCLFdBQVcsTUFBTSx3QkFBUyxFQUFFakMsd0JBQUYsRUFBZTBCLHFCQUFmLEVBQVQsRUFBaUNlLEdBQWpDLENBQXFDdEMsS0FBS1UsRUFBMUMsQ0FBdkI7O0FBRUFvQixpQkFBU0QsR0FBVCxDQUFhTCxNQUFiLENBQW9CTyxLQUFwQixDQUEwQi9CLEtBQUtVLEVBQS9CO0FBQ0FnQyxhQUFLQyxTQUFMLENBQWViLFNBQVM5QixJQUF4QixFQUE4QndCLE1BQTlCLENBQXFDTyxLQUFyQyxDQUEyQ1csS0FBS0MsU0FBTCxDQUFlM0MsSUFBZixDQUEzQztBQUNELE9BTEQ7QUFNRCxLQW5CRDs7QUFxQkEseUJBQVMseUJBQVQsRUFBb0MsWUFBTTtBQUN4Qyw2QkFBVyxZQUFNO0FBQ2ZILG9CQUFZcUMsT0FBWixDQUFvQkMsSUFBcEIsR0FBMkJDLGFBQTNCLENBQXlDcEMsS0FBS1UsRUFBOUMsRUFDRzJCLFFBREgsQ0FDWSxJQURaO0FBRUQsT0FIRDs7QUFLQSxxQkFBRyxhQUFILEVBQWtCO0FBQUEsZUFBTSx3QkFBUyxFQUFFeEMsd0JBQUYsRUFBZTBCLHFCQUFmLEVBQVQsRUFBaUNlLEdBQWpDLENBQXFDdEMsS0FBS1UsRUFBMUMsRUFDckJrQyxJQURxQixDQUNoQjtBQUFBLGlCQUFZLElBQUlwQixNQUFKLENBQVdPLEtBQVgsQ0FBaUIsR0FBakIsQ0FBWjtBQUFBLFNBRGdCLEVBRXJCYyxLQUZxQixDQUVmO0FBQUEsaUJBQU9DLElBQUliLE9BQUosQ0FBWVQsTUFBWixDQUFtQk8sS0FBbkIsQ0FBeUJ2QixtQkFBekIsQ0FBUDtBQUFBLFNBRmUsQ0FBTjtBQUFBLE9BQWxCO0FBR0QsS0FURDs7QUFXQSx5QkFBUyxtQ0FBVCxFQUE4QyxZQUFNO0FBQ2xELDZCQUFXLFlBQU07QUFDZlgsb0JBQVlxQyxPQUFaLENBQW9CQyxJQUFwQixHQUEyQkMsYUFBM0IsQ0FBeUNwQyxLQUFLVSxFQUE5QyxFQUNHcUMsT0FESCxDQUNXLElBQUlDLEtBQUosQ0FBVXZDLHVCQUFWLENBRFg7QUFFRCxPQUhEOztBQUtBLHFCQUFHLGFBQUgsRUFBa0I7QUFBQSxlQUFNLHdCQUFTLEVBQUVaLHdCQUFGLEVBQWUwQixxQkFBZixFQUFULEVBQWlDZSxHQUFqQyxDQUFxQ3RDLEtBQUtVLEVBQTFDLEVBQ3JCa0MsSUFEcUIsQ0FDaEI7QUFBQSxpQkFBWSxJQUFJcEIsTUFBSixDQUFXTyxLQUFYLENBQWlCLEdBQWpCLENBQVo7QUFBQSxTQURnQixFQUVyQmMsS0FGcUIsQ0FFZjtBQUFBLGlCQUFPQyxJQUFJYixPQUFKLENBQVlULE1BQVosQ0FBbUJPLEtBQW5CLENBQXlCdEIsdUJBQXpCLENBQVA7QUFBQSxTQUZlLENBQU47QUFBQSxPQUFsQjtBQUdELEtBVEQ7QUFVRCxHQS9DRDs7QUFpREEsdUJBQVMsNEJBQVQsRUFBdUMsWUFBTTtBQUMzQywyQkFBVyxZQUFNO0FBQUE7O0FBQ2YsMkNBQVl3QyxLQUFaLENBQWtCZCxJQUFsQixJQUF5QkMsYUFBekIsaURBQTBDakMsYUFBMUMsR0FDR2tDLFFBREgsQ0FDWWhDLGFBRFo7QUFFQVQsY0FBUSxDQUFFQyxZQUFZb0QsS0FBZCxDQUFSO0FBQ0QsS0FKRDs7QUFNQSxtQkFBRyx5QkFBSCxFQUE4QjtBQUFBLGFBQzVCLHdCQUFTLEVBQUVwRCx3QkFBRixFQUFlMEIscUJBQWYsRUFBVCxFQUNHSyxNQURILENBQ1UsRUFBRUMsS0FBSzdCLEtBQUtVLEVBQVosRUFBZ0JWLFVBQWhCLEVBRFYsRUFDa0NrRCxJQURsQyxHQUN5QzFCLE1BRHpDLENBQ2dEZSxFQURoRCxDQUNtREMsQ0FEbkQsQ0FDcUQsU0FEckQsQ0FENEI7QUFBQSxLQUE5Qjs7QUFJQSxtQkFBRyxzQkFBSCxFQUEyQjtBQUFBLGFBQ3pCLHdCQUFTLEVBQUUzQyx3QkFBRixFQUFlMEIscUJBQWYsRUFBVCxFQUNHSyxNQURILENBQ1UsRUFBRUMsS0FBSzdCLEtBQUtVLEVBQVosRUFBZ0JWLFVBQWhCLEVBRFYsRUFDa0NrRCxJQURsQyxHQUN5QzFCLE1BRHpDLENBQ2dEaUIsVUFEaEQsQ0FFR1YsS0FGSCxDQUVTMUIsYUFGVCxDQUR5QjtBQUFBLEtBQTNCO0FBSUQsR0FmRDtBQWdCRCxDQTdMRCIsImZpbGUiOiJyZWRpc09ETS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXRpbHMgfSBmcm9tICdqcy11dGlscydcblxuaW1wb3J0IHsgZGVzY3JpYmUsIGJlZm9yZSwgYmVmb3JlRWFjaCwgYWZ0ZXJFYWNoLCBpdCB9IGZyb20gJy4vLi4vLi4vc2V0dXAnXG4vLyB1bml0XG5pbXBvcnQgcmVkaXNPRE0gZnJvbSAnLi8uLi8uLi8uLi9tYWluL2xpYi9vZG0vcmVkaXNPRE0nXG4vLyBtb2Nrc1xuaW1wb3J0IHJlZGlzQ2xpZW50V3JhcHBlck1vY2tcbiAgZnJvbSAnLi8uLi8uLi9tb2Nrcy9saWIvd3JhcHBlcnMvcmVkaXNDbGllbnRXcmFwcGVyJ1xuXG5kZXNjcmliZSgnUmVkaXNPRE0nLCAoKSA9PiB7XG4gIGxldFxuICAgIG1vY2tzLFxuICAgIHJlZGlzQ2xpZW50LFxuICAgIGV4cGVjdGVkT0RNUHJvcGVydGllcyxcbiAgICBleHBlY3RlZE1vZGVsT2JqUHJvcGVydGllcyxcbiAgICBkYXRhLFxuICAgIGRhdGFXaXRoQ29sb25JbkFLZXksXG4gICAgZGF0YVdpdGhBcnJheSxcbiAgICBmbGF0dGVuZWREYXRhLFxuICAgIGhnZXRhbGxSZXNwb25zZSxcbiAgICBwb3NpdGl2ZVJlcGx5LFxuICAgIG5vQ29sb25JbktleUVycm9yTXNnLFxuICAgIG5vQXJyYXlBc1ZhbHVlRXJyb3JNc2csXG4gICAga2V5Tm90Rm91bmRFcnJvck1zZyxcbiAgICByZWRpc0NsaWVudEZhaWxFcnJvck1zZ1xuXG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgZXhwZWN0ZWRPRE1Qcm9wZXJ0aWVzID0gWydjcmVhdGUnLCAnZ2V0J11cbiAgICBleHBlY3RlZE1vZGVsT2JqUHJvcGVydGllcyA9IFsna2V5JywgJ2RhdGEnLCAnc2F2ZSddXG4gICAgZGF0YSA9IHtcbiAgICAgIGlkOiAxMjYsXG4gICAgICBuYW1lOiAnc29tZU5hbWUnLFxuICAgICAgZW50cnk6IHtcbiAgICAgICAgaWQ6IDc4LFxuICAgICAgICB2YWx1ZTogNDUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgJ2RhdGUnOiBuZXcgRGF0ZShEYXRlLnBhcnNlKCcyMDE4LTAzLTAxVDIzOjU4OjM1WicpKSxcbiAgICAgICAgICAnbG9jYXRpb24nOiAnc29tZUxvY2F0aW9uJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWV0YToge1xuICAgICAgICBtZXRhMTogJ2hlbGxvJyxcbiAgICAgICAgbWV0YTI6IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YVdpdGhDb2xvbkluQUtleSA9IHtcbiAgICAgIGlkOiAzLFxuICAgICAgJ3ZhbHVlOndpdGhjb2xvbic6ICdzb21ldmFsdWUnXG4gICAgfVxuICAgIGRhdGFXaXRoQXJyYXkgPSB7XG4gICAgICBpZDogMyxcbiAgICAgIHZhbHVlOiBbJ3NvbWV2YWx1ZSddXG4gICAgfVxuICAgIGZsYXR0ZW5lZERhdGEgPSBbMTI2LCAnaWQnLCAxMjYsICduYW1lJywgJ3NvbWVOYW1lJywgJ2VudHJ5OmlkJywgNzgsXG4gICAgICAnZW50cnk6dmFsdWUnLCA0NSwgJ2VudHJ5OmRlc2NyaXB0aW9uOmRhdGUnLFxuICAgICAgbmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxOC0wMy0wMVQyMzo1ODozNVonKSksXG4gICAgICAnZW50cnk6ZGVzY3JpcHRpb246bG9jYXRpb24nLCAnc29tZUxvY2F0aW9uJywgJ21ldGE6bWV0YTEnLCAnaGVsbG8nLFxuICAgICAgJ21ldGE6bWV0YTInLCB0cnVlXVxuICAgIGhnZXRhbGxSZXNwb25zZSA9IHtcbiAgICAgICdpZCc6IDEyNixcbiAgICAgICduYW1lJzogJ3NvbWVOYW1lJyxcbiAgICAgICdlbnRyeTppZCc6IDc4LFxuICAgICAgJ2VudHJ5OnZhbHVlJzogNDUsXG4gICAgICAnZW50cnk6ZGVzY3JpcHRpb246ZGF0ZSc6IG5ldyBEYXRlKERhdGUucGFyc2UoJzIwMTgtMDMtMDFUMjM6NTg6MzVaJykpLFxuICAgICAgJ2VudHJ5OmRlc2NyaXB0aW9uOmxvY2F0aW9uJzogJ3NvbWVMb2NhdGlvbicsXG4gICAgICAnbWV0YTptZXRhMSc6ICdoZWxsbycsXG4gICAgICAnbWV0YTptZXRhMic6IHRydWVcbiAgICB9XG4gICAgcG9zaXRpdmVSZXBseSA9ICdPSydcbiAgICBub0NvbG9uSW5LZXlFcnJvck1zZyA9ICdPY2N1cmVuY2Ugb2YgXCI6XCIgaW4ga2V5IGlzIG5vdCBzdXBwb3J0ZWQnXG4gICAgbm9BcnJheUFzVmFsdWVFcnJvck1zZyA9ICdBcnJheSBhcyB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkJ1xuICAgIGtleU5vdEZvdW5kRXJyb3JNc2cgPVxuICAgICAgYENvdWxkIG5vdCBmaW5kIGRhdGEgbWF0Y2hpbmcgdGhlIHByb3ZpZGVkIGtleSAoJHtkYXRhLmlkfSlgXG4gICAgcmVkaXNDbGllbnRGYWlsRXJyb3JNc2cgPSAnZXJyJ1xuICB9KVxuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHJlZGlzQ2xpZW50ID0gcmVkaXNDbGllbnRXcmFwcGVyTW9jaygpXG4gIH0pXG5cbiAgYWZ0ZXJFYWNoKCgpID0+IG1vY2tzLmZvckVhY2gobW9jayA9PiBtb2NrLnZlcmlmeSgpKSlcblxuICBkZXNjcmliZSgnV2hlbiBjcmVhdGluZyByZWRpc09ETScsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tzID0gW11cbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIHByb3BlcnRpZXMnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSkuc2hvdWxkLmhhdmUuYWxsXG4gICAgICAgIC5rZXlzKGV4cGVjdGVkT0RNUHJvcGVydGllcykpXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjcmVhdGluZyBhIG1vZGVsIG9iamVjdCcsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgaGF2ZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSlcbiAgICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhIH0pLnNob3VsZC5oYXZlLmFsbFxuICAgICAgICAgIC5rZXlzKGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzKSlcblxuICAgICAgaXQoJ3Nob3VsZCBtYXAgdGhlIGRhdGEgcHJvcGVybHknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsT2JqID0gcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSlcbiAgICAgICAgICAuY3JlYXRlKHsga2V5OiBkYXRhLmlkLCBkYXRhIH0pXG5cbiAgICAgICAgbW9kZWxPYmoua2V5LnNob3VsZC5lcXVhbChkYXRhLmlkKVxuICAgICAgICBtb2RlbE9iai5kYXRhLnNob3VsZC5lcXVhbChkYXRhKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgYSBtb2RlbCBvYmplY3Qgd2l0aCBjb2xvbiBpbiBhIGtleScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCcsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZWRpc09ETSh7IHJlZGlzQ2xpZW50LCB1dGlscyB9KVxuICAgICAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YVdpdGhDb2xvbkluQUtleS5pZCwgZGF0YTogZGF0YVdpdGhDb2xvbkluQUtleSB9KVxuICAgICAgICAgICcxJy5zaG91bGQuZXF1YWwoJzInKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZS5tZXNzYWdlLnNob3VsZFxuICAgICAgICAgICAgLmVxdWFsKG5vQ29sb25JbktleUVycm9yTXNnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBjcmVhdGluZyBhIG1vZGVsIG9iamVjdCB3aXRoIGFycmF5IGFzIGEgdmFsdWUnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwnLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSlcbiAgICAgICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGE6IGRhdGFXaXRoQXJyYXkgfSlcbiAgICAgICAgICAnMScuc2hvdWxkLmVxdWFsKCcyJylcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGUubWVzc2FnZS5zaG91bGRcbiAgICAgICAgICAgIC5lcXVhbChub0FycmF5QXNWYWx1ZUVycm9yTXNnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gZ2V0dGluZyBhIG1vZGVsIG9iamVjdCcsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tzID0gWyByZWRpc0NsaWVudC5oZ2V0YWxsIF1cbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4ga2V5IGV4aXN0cycsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICByZWRpc0NsaWVudC5oZ2V0YWxsLm9uY2UoKS53aXRoRXhhY3RBcmdzKGRhdGEuaWQpXG4gICAgICAgICAgLnJlc29sdmVzKGhnZXRhbGxSZXNwb25zZSlcbiAgICAgIH0pXG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcHJvbWlzZScsICgpID0+XG4gICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pLmdldChkYXRhLmlkKS5zaG91bGQuYmUuYSgncHJvbWlzZScpKVxuXG4gICAgICBpdCgnc2hvdWxkIGhhdmUgZXhwZWN0ZWQgcHJvcGVydGllcycsICgpID0+XG4gICAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pLmdldChkYXRhLmlkKVxuICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmFsbC5rZXlzKGV4cGVjdGVkTW9kZWxPYmpQcm9wZXJ0aWVzKSlcblxuICAgICAgaXQoJ3Nob3VsZCBtYXAgdGhlIGRhdGEgcHJvcGVybHknLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsT2JqID0gYXdhaXQgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSkuZ2V0KGRhdGEuaWQpXG5cbiAgICAgICAgbW9kZWxPYmoua2V5LnNob3VsZC5lcXVhbChkYXRhLmlkKVxuICAgICAgICBKU09OLnN0cmluZ2lmeShtb2RlbE9iai5kYXRhKS5zaG91bGQuZXF1YWwoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiBrZXkgZG9lcyBub3QgZXhpc3QnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgcmVkaXNDbGllbnQuaGdldGFsbC5vbmNlKCkud2l0aEV4YWN0QXJncyhkYXRhLmlkKVxuICAgICAgICAgIC5yZXNvbHZlcyhudWxsKVxuICAgICAgfSlcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4gcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSkuZ2V0KGRhdGEuaWQpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+ICcxJy5zaG91bGQuZXF1YWwoJzInKSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiBlcnIubWVzc2FnZS5zaG91bGQuZXF1YWwoa2V5Tm90Rm91bmRFcnJvck1zZykpKVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnV2hlbiB1bmRlcmx5aW5nIHJlZGlzQ2xpZW50IGZhaWxzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlZGlzQ2xpZW50LmhnZXRhbGwub25jZSgpLndpdGhFeGFjdEFyZ3MoZGF0YS5pZClcbiAgICAgICAgICAucmVqZWN0cyhuZXcgRXJyb3IocmVkaXNDbGllbnRGYWlsRXJyb3JNc2cpKVxuICAgICAgfSlcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4gcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSkuZ2V0KGRhdGEuaWQpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+ICcxJy5zaG91bGQuZXF1YWwoJzInKSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiBlcnIubWVzc2FnZS5zaG91bGQuZXF1YWwocmVkaXNDbGllbnRGYWlsRXJyb3JNc2cpKSlcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCdXaGVuIHNhdmluZyBhIG1vZGVsIG9iamVjdCcsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHJlZGlzQ2xpZW50Lmhtc2V0Lm9uY2UoKS53aXRoRXhhY3RBcmdzKC4uLmZsYXR0ZW5lZERhdGEpXG4gICAgICAgIC5yZXNvbHZlcyhwb3NpdGl2ZVJlcGx5KVxuICAgICAgbW9ja3MgPSBbIHJlZGlzQ2xpZW50Lmhtc2V0IF1cbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYSBwcm9taXNlJywgKCkgPT5cbiAgICAgIHJlZGlzT0RNKHsgcmVkaXNDbGllbnQsIHV0aWxzIH0pXG4gICAgICAgIC5jcmVhdGUoeyBrZXk6IGRhdGEuaWQsIGRhdGEgfSkuc2F2ZSgpLnNob3VsZC5iZS5hKCdwcm9taXNlJykpXG5cbiAgICBpdCgnc2hvdWxkIGJlIHN1Y2Nlc3NmdWwnLCAoKSA9PlxuICAgICAgcmVkaXNPRE0oeyByZWRpc0NsaWVudCwgdXRpbHMgfSlcbiAgICAgICAgLmNyZWF0ZSh7IGtleTogZGF0YS5pZCwgZGF0YSB9KS5zYXZlKCkuc2hvdWxkLmV2ZW50dWFsbHlcbiAgICAgICAgLmVxdWFsKHBvc2l0aXZlUmVwbHkpKVxuICB9KVxufSlcbiJdfQ==