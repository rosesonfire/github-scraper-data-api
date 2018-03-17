'use strict';

var _setup = require('./../../setup');

var _expressWrapper = require('./../../../main/lib/wrappers/expressWrapper');

var _expressWrapper2 = _interopRequireDefault(_expressWrapper);

var _express = require('./../../mocks/others/express');

var _express2 = _interopRequireDefault(_express);

var _anonymousSpy = require('./../../mocks/others/anonymousSpy');

var _anonymousSpy2 = _interopRequireDefault(_anonymousSpy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// unit

// mocks


(0, _setup.describe)('ExpressWrapper', function () {
  var mocks = void 0,
      spies = void 0,
      express = void 0,
      app = void 0,
      singleMiddleware = void 0,
      multiMiddlewares = void 0,
      singleGetRoute = void 0,
      singlePostRoute = void 0,
      singleRoutes = void 0,
      multiRoutes = void 0,
      port = void 0,
      expectedProperties = void 0,
      logMessage = void 0;

  (0, _setup.before)(function () {
    singleMiddleware = ['middleware1'];
    multiMiddlewares = ['middleware1', 'middleware2', 'middleware3'];
    singleGetRoute = ['route1', 'controller1'];
    singlePostRoute = ['route2', 'controller2'];
    singleRoutes = { get: {}, post: {} };
    singleRoutes.get[singleGetRoute[0]] = singleGetRoute[1];
    singleRoutes.post[singlePostRoute[0]] = singlePostRoute[1];
    multiRoutes = {
      get: {
        'route3': 'controller3',
        'route4': 'controller4'
      },
      post: {
        'route5': 'controller5',
        'route6': 'controller6'
      }
    };
    port = 1234;
    expectedProperties = ['listen'];
    logMessage = 'Listening at port ' + port;
  });

  (0, _setup.beforeEach)(function () {
    (0, _anonymousSpy2.default)(console, 'log');
    // eslint-disable-next-line no-console
    spies = [console.log];
  });

  (0, _setup.afterEach)(function () {
    mocks.forEach(function (mock) {
      return mock.verify();
    });
    spies.forEach(function (spy) {
      return spy.restore();
    });
  });

  (0, _setup.describe)('When creating and using expressWrapper', function () {
    (0, _setup.beforeEach)(function () {
      app = (0, _express.expressAppMock)();
      express = (0, _express2.default)();
      express.once().withExactArgs().returns(app);
    });

    (0, _setup.describe)('When creating expressWrapper', function () {
      (0, _setup.beforeEach)(function () {
        mocks = [express, app.use, app.get, app.post];
      });

      (0, _setup.describe)('When passing single middleware, single get route and' + 'single post route', function () {
        (0, _setup.beforeEach)(function () {
          app.use.once().withExactArgs(singleMiddleware[0]);
          app.get.once().withExactArgs(singleGetRoute[0], singleGetRoute[1]);
          app.post.once().withExactArgs(singlePostRoute[0], singlePostRoute[1]);
        });

        (0, _setup.it)('should have expected properties', function () {
          var _expressWrapper$shoul;

          return (_expressWrapper$shoul = (0, _expressWrapper2.default)({
            express: express, middlewares: singleMiddleware, routes: singleRoutes, port: port
          }).should.have.all).keys.apply(_expressWrapper$shoul, _toConsumableArray(expectedProperties));
        });
      });

      (0, _setup.describe)('When passing mutliple middlewares, multiple get routes and ' + 'multiple post routes', function () {
        (0, _setup.beforeEach)(function () {
          app.use.exactly(multiMiddlewares.length);
          app.get.exactly(Object.entries(multiRoutes.get).length);
          app.post.exactly(Object.entries(multiRoutes.post).length);
        });

        (0, _setup.it)('should call the methods of app correct number of times', function () {
          return (0, _expressWrapper2.default)({
            express: express, middlewares: multiMiddlewares, routes: multiRoutes, port: port
          });
        });
      });
    });

    (0, _setup.describe)('When calling listen', function () {
      (0, _setup.beforeEach)(function () {
        app.use.once().withExactArgs(singleMiddleware[0]);
        app.get.once().withExactArgs(singleGetRoute[0], singleGetRoute[1]);
        app.post.once().withExactArgs(singlePostRoute[0], singlePostRoute[1]);
        app.listen.once().withArgs(port);
        mocks = [express, app.use, app.get, app.post, app.listen];
      });

      (0, _setup.it)('should pass the correct port', function () {
        return (0, _expressWrapper2.default)({
          express: express, middlewares: singleMiddleware, routes: singleRoutes, port: port }).listen();
      });
    });
  });

  (0, _setup.describe)('When message is logged', function () {
    (0, _setup.beforeEach)(function () {
      app = (0, _express.expressAppMockWithListenStub)();
      express = (0, _express2.default)();
      express.once().withExactArgs().returns(app);
      app.use.once().withExactArgs(singleMiddleware[0]);
      app.get.once().withExactArgs(singleGetRoute[0], singleGetRoute[1]);
      app.post.once().withExactArgs(singlePostRoute[0], singlePostRoute[1]);
      app.listen.withArgs(port).callsFake(function (port, callback) {
        return callback();
      });
      mocks = [express, app.use, app.get, app.post];
    });

    (0, _setup.it)('should log the correct message', function () {
      (0, _expressWrapper2.default)({
        express: express, middlewares: singleMiddleware, routes: singleRoutes, port: port
      }).listen();
      // eslint-disable-next-line no-unused-expressions, no-console
      console.log.withArgs(logMessage).calledOnce.should.be.true;
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L2xpYi93cmFwcGVycy9leHByZXNzV3JhcHBlci5zcGVjLmpzIl0sIm5hbWVzIjpbIm1vY2tzIiwic3BpZXMiLCJleHByZXNzIiwiYXBwIiwic2luZ2xlTWlkZGxld2FyZSIsIm11bHRpTWlkZGxld2FyZXMiLCJzaW5nbGVHZXRSb3V0ZSIsInNpbmdsZVBvc3RSb3V0ZSIsInNpbmdsZVJvdXRlcyIsIm11bHRpUm91dGVzIiwicG9ydCIsImV4cGVjdGVkUHJvcGVydGllcyIsImxvZ01lc3NhZ2UiLCJnZXQiLCJwb3N0IiwiY29uc29sZSIsImxvZyIsImZvckVhY2giLCJtb2NrIiwidmVyaWZ5Iiwic3B5IiwicmVzdG9yZSIsIm9uY2UiLCJ3aXRoRXhhY3RBcmdzIiwicmV0dXJucyIsInVzZSIsIm1pZGRsZXdhcmVzIiwicm91dGVzIiwic2hvdWxkIiwiaGF2ZSIsImFsbCIsImtleXMiLCJleGFjdGx5IiwibGVuZ3RoIiwiT2JqZWN0IiwiZW50cmllcyIsImxpc3RlbiIsIndpdGhBcmdzIiwiY2FsbHNGYWtlIiwiY2FsbGJhY2siLCJjYWxsZWRPbmNlIiwiYmUiLCJ0cnVlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOzs7O0FBRUE7Ozs7QUFFQTs7Ozs7OztBQUxBOztBQUVBOzs7QUFLQSxxQkFBUyxnQkFBVCxFQUEyQixZQUFNO0FBQy9CLE1BQ0VBLGNBREY7QUFBQSxNQUVFQyxjQUZGO0FBQUEsTUFHRUMsZ0JBSEY7QUFBQSxNQUlFQyxZQUpGO0FBQUEsTUFLRUMseUJBTEY7QUFBQSxNQU1FQyx5QkFORjtBQUFBLE1BT0VDLHVCQVBGO0FBQUEsTUFRRUMsd0JBUkY7QUFBQSxNQVNFQyxxQkFURjtBQUFBLE1BVUVDLG9CQVZGO0FBQUEsTUFXRUMsYUFYRjtBQUFBLE1BWUVDLDJCQVpGO0FBQUEsTUFhRUMsbUJBYkY7O0FBZUEscUJBQU8sWUFBTTtBQUNYUix1QkFBbUIsQ0FBQyxhQUFELENBQW5CO0FBQ0FDLHVCQUFt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QUFlQyxhQUFmLEdBQStCQyxPQUEvQixDQUF1Q3JCLEdBQXZDO0FBQ0FBLFVBQUlzQixHQUFKLENBQVFILElBQVIsR0FBZUMsYUFBZixDQUE2Qm5CLGlCQUFpQixDQUFqQixDQUE3QjtBQUNBRCxVQUFJVSxHQUFKLENBQVFTLElBQVIsR0FBZUMsYUFBZixDQUE2QmpCLGVBQWUsQ0FBZixDQUE3QixFQUFnREEsZUFBZSxDQUFmLENBQWhEO0FBQ0FILFVBQUlXLElBQUosQ0FBU1EsSUFBVCxHQUFnQkMsYUFBaEIsQ0FBOEJoQixnQkFBZ0IsQ0FBaEIsQ0FBOUIsRUFBa0RBLGdCQUFnQixDQUFoQixDQUFsRDtBQUNBSixVQUFJaUMsTUFBSixDQUFXQyxRQUFYLENBQW9CM0IsSUFBcEIsRUFBMEI0QixTQUExQixDQUFvQyxVQUFDNUIsSUFBRCxFQUFPNkIsUUFBUDtBQUFBLGVBQW9CQSxVQUFwQjtBQUFBLE9BQXBDO0FBQ0F2QyxjQUFRLENBQUNFLE9BQUQsRUFBVUMsSUFBSXNCLEdBQWQsRUFBbUJ0QixJQUFJVSxHQUF2QixFQUE0QlYsSUFBSVcsSUFBaEMsQ0FBUjtBQUNELEtBVEQ7O0FBV0EsbUJBQUcsZ0NBQUgsRUFBcUMsWUFBTTtBQUN6QyxvQ0FBZTtBQUNiWix3QkFEYSxFQUNKd0IsYUFBYXRCLGdCQURULEVBQzJCdUIsUUFBUW5CLFlBRG5DLEVBQ2lERTtBQURqRCxPQUFmLEVBRUcwQixNQUZIO0FBR0E7QUFDQXJCLGNBQVFDLEdBQVIsQ0FBWXFCLFFBQVosQ0FBcUJ6QixVQUFyQixFQUFpQzRCLFVBQWpDLENBQTRDWixNQUE1QyxDQUFtRGEsRUFBbkQsQ0FBc0RDLElBQXREO0FBQ0QsS0FORDtBQU9ELEdBbkJEO0FBb0JELENBL0hEIiwiZmlsZSI6ImV4cHJlc3NXcmFwcGVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZXNjcmliZSwgYmVmb3JlLCBiZWZvcmVFYWNoLCBhZnRlckVhY2gsIGl0IH0gZnJvbSAnLi8uLi8uLi9zZXR1cCdcbi8vIHVuaXRcbmltcG9ydCBleHByZXNzV3JhcHBlciBmcm9tICcuLy4uLy4uLy4uL21haW4vbGliL3dyYXBwZXJzL2V4cHJlc3NXcmFwcGVyJ1xuLy8gbW9ja3NcbmltcG9ydCBleHByZXNzTW9jaywgeyBleHByZXNzQXBwTW9jaywgZXhwcmVzc0FwcE1vY2tXaXRoTGlzdGVuU3R1YiB9IGZyb21cbiAgJy4vLi4vLi4vbW9ja3Mvb3RoZXJzL2V4cHJlc3MnXG5pbXBvcnQgYW5vbnltb3VzU3B5IGZyb20gJy4vLi4vLi4vbW9ja3Mvb3RoZXJzL2Fub255bW91c1NweSdcblxuZGVzY3JpYmUoJ0V4cHJlc3NXcmFwcGVyJywgKCkgPT4ge1xuICBsZXRcbiAgICBtb2NrcyxcbiAgICBzcGllcyxcbiAgICBleHByZXNzLFxuICAgIGFwcCxcbiAgICBzaW5nbGVNaWRkbGV3YXJlLFxuICAgIG11bHRpTWlkZGxld2FyZXMsXG4gICAgc2luZ2xlR2V0Um91dGUsXG4gICAgc2luZ2xlUG9zdFJvdXRlLFxuICAgIHNpbmdsZVJvdXRlcyxcbiAgICBtdWx0aVJvdXRlcyxcbiAgICBwb3J0LFxuICAgIGV4cGVjdGVkUHJvcGVydGllcyxcbiAgICBsb2dNZXNzYWdlXG5cbiAgYmVmb3JlKCgpID0+IHtcbiAgICBzaW5nbGVNaWRkbGV3YXJlID0gWydtaWRkbGV3YXJlMSddXG4gICAgbXVsdGlNaWRkbGV3YXJlcyA9IFsnbWlkZGxld2FyZTEnLCAnbWlkZGxld2FyZTInLCAnbWlkZGxld2FyZTMnXVxuICAgIHNpbmdsZUdldFJvdXRlID0gWydyb3V0ZTEnLCAnY29udHJvbGxlcjEnXVxuICAgIHNpbmdsZVBvc3RSb3V0ZSA9IFsncm91dGUyJywgJ2NvbnRyb2xsZXIyJ11cbiAgICBzaW5nbGVSb3V0ZXMgPSB7IGdldDoge30sIHBvc3Q6IHt9IH1cbiAgICBzaW5nbGVSb3V0ZXMuZ2V0W3NpbmdsZUdldFJvdXRlWzBdXSA9IHNpbmdsZUdldFJvdXRlWzFdXG4gICAgc2luZ2xlUm91dGVzLnBvc3Rbc2luZ2xlUG9zdFJvdXRlWzBdXSA9IHNpbmdsZVBvc3RSb3V0ZVsxXVxuICAgIG11bHRpUm91dGVzID0ge1xuICAgICAgZ2V0OiB7XG4gICAgICAgICdyb3V0ZTMnOiAnY29udHJvbGxlcjMnLFxuICAgICAgICAncm91dGU0JzogJ2NvbnRyb2xsZXI0J1xuICAgICAgfSxcbiAgICAgIHBvc3Q6IHtcbiAgICAgICAgJ3JvdXRlNSc6ICdjb250cm9sbGVyNScsXG4gICAgICAgICdyb3V0ZTYnOiAnY29udHJvbGxlcjYnXG4gICAgICB9XG4gICAgfVxuICAgIHBvcnQgPSAxMjM0XG4gICAgZXhwZWN0ZWRQcm9wZXJ0aWVzID0gWydsaXN0ZW4nXVxuICAgIGxvZ01lc3NhZ2UgPSBgTGlzdGVuaW5nIGF0IHBvcnQgJHtwb3J0fWBcbiAgfSlcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBhbm9ueW1vdXNTcHkoY29uc29sZSwgJ2xvZycpXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBzcGllcyA9IFtjb25zb2xlLmxvZ11cbiAgfSlcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIG1vY2tzLmZvckVhY2gobW9jayA9PiBtb2NrLnZlcmlmeSgpKVxuICAgIHNwaWVzLmZvckVhY2goc3B5ID0+IHNweS5yZXN0b3JlKCkpXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgYW5kIHVzaW5nIGV4cHJlc3NXcmFwcGVyJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgYXBwID0gZXhwcmVzc0FwcE1vY2soKVxuICAgICAgZXhwcmVzcyA9IGV4cHJlc3NNb2NrKClcbiAgICAgIGV4cHJlc3Mub25jZSgpLndpdGhFeGFjdEFyZ3MoKS5yZXR1cm5zKGFwcClcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ1doZW4gY3JlYXRpbmcgZXhwcmVzc1dyYXBwZXInLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja3MgPSBbZXhwcmVzcywgYXBwLnVzZSwgYXBwLmdldCwgYXBwLnBvc3RdXG4gICAgICB9KVxuXG4gICAgICBkZXNjcmliZSgnV2hlbiBwYXNzaW5nIHNpbmdsZSBtaWRkbGV3YXJlLCBzaW5nbGUgZ2V0IHJvdXRlIGFuZCcgK1xuICAgICAgICAgICAgICAgJ3NpbmdsZSBwb3N0IHJvdXRlJyxcbiAgICAgICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgYXBwLnVzZS5vbmNlKCkud2l0aEV4YWN0QXJncyhzaW5nbGVNaWRkbGV3YXJlWzBdKVxuICAgICAgICAgIGFwcC5nZXQub25jZSgpLndpdGhFeGFjdEFyZ3Moc2luZ2xlR2V0Um91dGVbMF0sIHNpbmdsZUdldFJvdXRlWzFdKVxuICAgICAgICAgIGFwcC5wb3N0Lm9uY2UoKS53aXRoRXhhY3RBcmdzKHNpbmdsZVBvc3RSb3V0ZVswXSwgc2luZ2xlUG9zdFJvdXRlWzFdKVxuICAgICAgICB9KVxuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBleHBlY3RlZCBwcm9wZXJ0aWVzJywgKCkgPT5cbiAgICAgICAgICBleHByZXNzV3JhcHBlcih7XG4gICAgICAgICAgICBleHByZXNzLCBtaWRkbGV3YXJlczogc2luZ2xlTWlkZGxld2FyZSwgcm91dGVzOiBzaW5nbGVSb3V0ZXMsIHBvcnRcbiAgICAgICAgICB9KS5zaG91bGQuaGF2ZS5hbGwua2V5cyguLi5leHBlY3RlZFByb3BlcnRpZXMpKVxuICAgICAgfSlcblxuICAgICAgZGVzY3JpYmUoJ1doZW4gcGFzc2luZyBtdXRsaXBsZSBtaWRkbGV3YXJlcywgbXVsdGlwbGUgZ2V0IHJvdXRlcyBhbmQgJyArXG4gICAgICAgICAgICAgICAnbXVsdGlwbGUgcG9zdCByb3V0ZXMnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIGFwcC51c2UuZXhhY3RseShtdWx0aU1pZGRsZXdhcmVzLmxlbmd0aClcbiAgICAgICAgICBhcHAuZ2V0LmV4YWN0bHkoT2JqZWN0LmVudHJpZXMobXVsdGlSb3V0ZXMuZ2V0KS5sZW5ndGgpXG4gICAgICAgICAgYXBwLnBvc3QuZXhhY3RseShPYmplY3QuZW50cmllcyhtdWx0aVJvdXRlcy5wb3N0KS5sZW5ndGgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBtZXRob2RzIG9mIGFwcCBjb3JyZWN0IG51bWJlciBvZiB0aW1lcycsICgpID0+XG4gICAgICAgICAgZXhwcmVzc1dyYXBwZXIoe1xuICAgICAgICAgICAgZXhwcmVzcywgbWlkZGxld2FyZXM6IG11bHRpTWlkZGxld2FyZXMsIHJvdXRlczogbXVsdGlSb3V0ZXMsIHBvcnRcbiAgICAgICAgICB9KSlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdXaGVuIGNhbGxpbmcgbGlzdGVuJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGFwcC51c2Uub25jZSgpLndpdGhFeGFjdEFyZ3Moc2luZ2xlTWlkZGxld2FyZVswXSlcbiAgICAgICAgYXBwLmdldC5vbmNlKCkud2l0aEV4YWN0QXJncyhzaW5nbGVHZXRSb3V0ZVswXSwgc2luZ2xlR2V0Um91dGVbMV0pXG4gICAgICAgIGFwcC5wb3N0Lm9uY2UoKS53aXRoRXhhY3RBcmdzKHNpbmdsZVBvc3RSb3V0ZVswXSwgc2luZ2xlUG9zdFJvdXRlWzFdKVxuICAgICAgICBhcHAubGlzdGVuLm9uY2UoKS53aXRoQXJncyhwb3J0KVxuICAgICAgICBtb2NrcyA9IFtleHByZXNzLCBhcHAudXNlLCBhcHAuZ2V0LCBhcHAucG9zdCwgYXBwLmxpc3Rlbl1cbiAgICAgIH0pXG5cbiAgICAgIGl0KCdzaG91bGQgcGFzcyB0aGUgY29ycmVjdCBwb3J0JywgKCkgPT4gZXhwcmVzc1dyYXBwZXIoe1xuICAgICAgICBleHByZXNzLCBtaWRkbGV3YXJlczogc2luZ2xlTWlkZGxld2FyZSwgcm91dGVzOiBzaW5nbGVSb3V0ZXMsIHBvcnQgfSlcbiAgICAgICAgLmxpc3RlbigpKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ1doZW4gbWVzc2FnZSBpcyBsb2dnZWQnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBhcHAgPSBleHByZXNzQXBwTW9ja1dpdGhMaXN0ZW5TdHViKClcbiAgICAgIGV4cHJlc3MgPSBleHByZXNzTW9jaygpXG4gICAgICBleHByZXNzLm9uY2UoKS53aXRoRXhhY3RBcmdzKCkucmV0dXJucyhhcHApXG4gICAgICBhcHAudXNlLm9uY2UoKS53aXRoRXhhY3RBcmdzKHNpbmdsZU1pZGRsZXdhcmVbMF0pXG4gICAgICBhcHAuZ2V0Lm9uY2UoKS53aXRoRXhhY3RBcmdzKHNpbmdsZUdldFJvdXRlWzBdLCBzaW5nbGVHZXRSb3V0ZVsxXSlcbiAgICAgIGFwcC5wb3N0Lm9uY2UoKS53aXRoRXhhY3RBcmdzKHNpbmdsZVBvc3RSb3V0ZVswXSwgc2luZ2xlUG9zdFJvdXRlWzFdKVxuICAgICAgYXBwLmxpc3Rlbi53aXRoQXJncyhwb3J0KS5jYWxsc0Zha2UoKHBvcnQsIGNhbGxiYWNrKSA9PiBjYWxsYmFjaygpKVxuICAgICAgbW9ja3MgPSBbZXhwcmVzcywgYXBwLnVzZSwgYXBwLmdldCwgYXBwLnBvc3RdXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgbG9nIHRoZSBjb3JyZWN0IG1lc3NhZ2UnLCAoKSA9PiB7XG4gICAgICBleHByZXNzV3JhcHBlcih7XG4gICAgICAgIGV4cHJlc3MsIG1pZGRsZXdhcmVzOiBzaW5nbGVNaWRkbGV3YXJlLCByb3V0ZXM6IHNpbmdsZVJvdXRlcywgcG9ydFxuICAgICAgfSkubGlzdGVuKClcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nLndpdGhBcmdzKGxvZ01lc3NhZ2UpLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWVcbiAgICB9KVxuICB9KVxufSlcbiJdfQ==