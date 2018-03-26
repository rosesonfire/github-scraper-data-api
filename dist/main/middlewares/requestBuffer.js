'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// TODO: test for invalid url
// TODO: authentication and secret keys
/**
 * Creates a response buffer
 * @param {Number} requestBufferLimit the size of the buffer
 * @param {Number} ttl the maximum time (in milliseconds) to live for each async
 *                     task
 */
var createResponseBuffer = function createResponseBuffer(requestBufferLimit, ttl) {
  var responseBuffer = {
    _buffer: {}
  };
  var requestIDs = Array(requestBufferLimit).fill(0).map(function (value, index) {
    return index;
  });

  // Removes the timedout buffered responses from the response buffer
  responseBuffer.clean = function () {
    var now = Date.now();
    var buffer = responseBuffer._buffer;

    Object.keys(buffer).forEach(function (requestID) {
      if (now - buffer[requestID].creationTime > ttl) {
        delete buffer[requestID];
      }
    });
  };

  // Gets the id of an available slot in the buffer
  responseBuffer.getNewID = function () {
    var buffer = responseBuffer._buffer;

    responseBuffer.clean();

    return requestIDs.find(function (id) {
      return !(id in buffer);
    });
  };

  // Pushes a new bufferedResponse into the responseBuffer
  responseBuffer.push = function (requestID, bufferedResponse) {
    responseBuffer._buffer[requestID] = bufferedResponse;
  };

  // Gets an existing bufferedResponse from the responseBuffer
  responseBuffer.search = function (requestToken) {
    var entry = Object.entries(responseBuffer._buffer).find(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          requestID = _ref2[0],
          bufferedResponse = _ref2[1];

      return bufferedResponse.requestToken === requestToken;
    });

    return entry ? {
      requestID: entry[0],
      bufferedResponse: entry[1]
    } : undefined;
  };

  // Deletes an existing bufferedResponse from the responseBuffer
  responseBuffer.remove = function (requestID) {
    return delete responseBuffer._buffer[requestID];
  };

  return responseBuffer;
};

// Create a buffered response to be added to the response buffer
var createBufferedResponse = function createBufferedResponse() {
  var bufferedResponse = {
    // TODO: this is not secure, make it more cryptic
    requestToken: Date.now(),
    completed: false,
    succeeded: false,
    response: null,
    error: null,
    creationTime: Date.now()
    // Called once the underlying async task succeeds
  };bufferedResponse.resolve = function (response) {
    bufferedResponse.completed = true;
    bufferedResponse.succeeded = true;
    bufferedResponse.response = response;
  };
  // Called once the underlying async task fails
  bufferedResponse.reject = function (error) {
    bufferedResponse.completed = true;
    bufferedResponse.succeeded = false;
    bufferedResponse.error = error;
  };

  return bufferedResponse;
};

// Set the relevant method into the response object
var decorateResponseObject = function decorateResponseObject(res, bufferedResponse) {
  res.setBufferedResponse = function (asyncTask) {
    if (!asyncTask.then || !asyncTask.catch) {
      // If the underlying task is not asynchronous, the throw an error
      throw new Error('Task must be a promise');
    }
    asyncTask.then(bufferedResponse.resolve).catch(bufferedResponse.reject);
  };
};

var handleRequestForNewTask = function handleRequestForNewTask(res, next, responseBuffer) {
  var requestID = responseBuffer.getNewID();

  if (requestID === undefined) {
    res.status(503).json({ error: 'Request queue is overloaded.' });
  } else {
    var bufferedResponse = createBufferedResponse();

    responseBuffer.push(requestID, bufferedResponse);
    decorateResponseObject(res, bufferedResponse);
    next();
    res.status(202).json({ requestToken: bufferedResponse.requestToken });
  }
};

var handleRequestForBufferedTask = function handleRequestForBufferedTask(debug) {
  return function (requestToken, res, responseBuffer) {
    var searchResult = responseBuffer.search(requestToken);

    if (searchResult) {
      var requestID = searchResult.requestID,
          bufferedResponse = searchResult.bufferedResponse;


      if (bufferedResponse.completed) {
        responseBuffer.remove(requestID);

        if (bufferedResponse.succeeded) {
          // TODO: test for cases where response is not an object
          res.status(200).json(bufferedResponse.response);
        } else {
          res.status(500);
          if (debug) {
            res.json({
              message: bufferedResponse.error.message,
              stack: bufferedResponse.error.stack
            });
          } else {
            res.json({ message: 'Error' });
          }
        }
      } else {
        res.sendStatus(202);
      }
    } else {
      res.sendStatus(404);
    }
  };
};

/**
 * The RequestBuffer middleware
 * @param {Number} requestBufferLimit the size of the buffer
 * @param {Number} ttl the maximum time (in milliseconds) to live for each async
 *               task
 */

exports.default = function (_ref3) {
  var requestBufferLimit = _ref3.requestBufferLimit,
      ttl = _ref3.ttl,
      debug = _ref3.debug;

  var responseBuffer = createResponseBuffer(requestBufferLimit, ttl);

  return function (req, res, next) {
    if (req.body.requestToken === undefined) {
      handleRequestForNewTask(res, next, responseBuffer);
    } else {
      var requestToken = req.body.requestToken;

      handleRequestForBufferedTask(debug)(requestToken, res, responseBuffer);
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL21pZGRsZXdhcmVzL3JlcXVlc3RCdWZmZXIuanMiXSwibmFtZXMiOlsiY3JlYXRlUmVzcG9uc2VCdWZmZXIiLCJyZXF1ZXN0QnVmZmVyTGltaXQiLCJ0dGwiLCJyZXNwb25zZUJ1ZmZlciIsIl9idWZmZXIiLCJyZXF1ZXN0SURzIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwidmFsdWUiLCJpbmRleCIsImNsZWFuIiwibm93IiwiRGF0ZSIsImJ1ZmZlciIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVxdWVzdElEIiwiY3JlYXRpb25UaW1lIiwiZ2V0TmV3SUQiLCJmaW5kIiwiaWQiLCJwdXNoIiwiYnVmZmVyZWRSZXNwb25zZSIsInNlYXJjaCIsInJlcXVlc3RUb2tlbiIsImVudHJ5IiwiZW50cmllcyIsInVuZGVmaW5lZCIsInJlbW92ZSIsImNyZWF0ZUJ1ZmZlcmVkUmVzcG9uc2UiLCJjb21wbGV0ZWQiLCJzdWNjZWVkZWQiLCJyZXNwb25zZSIsImVycm9yIiwicmVzb2x2ZSIsInJlamVjdCIsImRlY29yYXRlUmVzcG9uc2VPYmplY3QiLCJyZXMiLCJzZXRCdWZmZXJlZFJlc3BvbnNlIiwiYXN5bmNUYXNrIiwidGhlbiIsImNhdGNoIiwiRXJyb3IiLCJoYW5kbGVSZXF1ZXN0Rm9yTmV3VGFzayIsIm5leHQiLCJzdGF0dXMiLCJqc29uIiwiaGFuZGxlUmVxdWVzdEZvckJ1ZmZlcmVkVGFzayIsInNlYXJjaFJlc3VsdCIsImRlYnVnIiwibWVzc2FnZSIsInN0YWNrIiwic2VuZFN0YXR1cyIsInJlcSIsImJvZHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOzs7Ozs7QUFNQSxJQUFNQSx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFDQyxrQkFBRCxFQUFxQkMsR0FBckIsRUFBNkI7QUFDeEQsTUFBTUMsaUJBQWlCO0FBQ3JCQyxhQUFTO0FBRFksR0FBdkI7QUFHQSxNQUFNQyxhQUFhQyxNQUFNTCxrQkFB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dURwQyxjQUF2RDtBQUNEO0FBQ0YsR0FSRDtBQVNELEMiLCJmaWxlIjoicmVxdWVzdEJ1ZmZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE86IHRlc3QgZm9yIGludmFsaWQgdXJsXG4vLyBUT0RPOiBhdXRoZW50aWNhdGlvbiBhbmQgc2VjcmV0IGtleXNcbi8qKlxuICogQ3JlYXRlcyBhIHJlc3BvbnNlIGJ1ZmZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHJlcXVlc3RCdWZmZXJMaW1pdCB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVyXG4gKiBAcGFyYW0ge051bWJlcn0gdHRsIHRoZSBtYXhpbXVtIHRpbWUgKGluIG1pbGxpc2Vjb25kcykgdG8gbGl2ZSBmb3IgZWFjaCBhc3luY1xuICogICAgICAgICAgICAgICAgICAgICB0YXNrXG4gKi9cbmNvbnN0IGNyZWF0ZVJlc3BvbnNlQnVmZmVyID0gKHJlcXVlc3RCdWZmZXJMaW1pdCwgdHRsKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlQnVmZmVyID0ge1xuICAgIF9idWZmZXI6IHt9XG4gIH1cbiAgY29uc3QgcmVxdWVzdElEcyA9IEFycmF5KHJlcXVlc3RCdWZmZXJMaW1pdCkuZmlsbCgwKVxuICAgIC5tYXAoKHZhbHVlLCBpbmRleCkgPT4gaW5kZXgpXG5cbiAgLy8gUmVtb3ZlcyB0aGUgdGltZWRvdXQgYnVmZmVyZWQgcmVzcG9uc2VzIGZyb20gdGhlIHJlc3BvbnNlIGJ1ZmZlclxuICByZXNwb25zZUJ1ZmZlci5jbGVhbiA9ICgpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpXG4gICAgY29uc3QgYnVmZmVyID0gcmVzcG9uc2VCdWZmZXIuX2J1ZmZlclxuXG4gICAgT2JqZWN0LmtleXMoYnVmZmVyKS5mb3JFYWNoKHJlcXVlc3RJRCA9PiB7XG4gICAgICBpZiAobm93IC0gYnVmZmVyW3JlcXVlc3RJRF0uY3JlYXRpb25UaW1lID4gdHRsKSB7XG4gICAgICAgIGRlbGV0ZSBidWZmZXJbcmVxdWVzdElEXVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBHZXRzIHRoZSBpZCBvZiBhbiBhdmFpbGFibGUgc2xvdCBpbiB0aGUgYnVmZmVyXG4gIHJlc3BvbnNlQnVmZmVyLmdldE5ld0lEID0gKCkgPT4ge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHJlc3BvbnNlQnVmZmVyLl9idWZmZXJcblxuICAgIHJlc3BvbnNlQnVmZmVyLmNsZWFuKClcblxuICAgIHJldHVybiByZXF1ZXN0SURzLmZpbmQoaWQgPT4gIShpZCBpbiBidWZmZXIpKVxuICB9XG5cbiAgLy8gUHVzaGVzIGEgbmV3IGJ1ZmZlcmVkUmVzcG9uc2UgaW50byB0aGUgcmVzcG9uc2VCdWZmZXJcbiAgcmVzcG9uc2VCdWZmZXIucHVzaCA9IChyZXF1ZXN0SUQsIGJ1ZmZlcmVkUmVzcG9uc2UpID0+IHtcbiAgICByZXNwb25zZUJ1ZmZlci5fYnVmZmVyW3JlcXVlc3RJRF0gPSBidWZmZXJlZFJlc3BvbnNlXG4gIH1cblxuICAvLyBHZXRzIGFuIGV4aXN0aW5nIGJ1ZmZlcmVkUmVzcG9uc2UgZnJvbSB0aGUgcmVzcG9uc2VCdWZmZXJcbiAgcmVzcG9uc2VCdWZmZXIuc2VhcmNoID0gKHJlcXVlc3RUb2tlbikgPT4ge1xuICAgIGNvbnN0IGVudHJ5ID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2VCdWZmZXIuX2J1ZmZlcilcbiAgICAgIC5maW5kKChbcmVxdWVzdElELCBidWZmZXJlZFJlc3BvbnNlXSkgPT5cbiAgICAgICAgYnVmZmVyZWRSZXNwb25zZS5yZXF1ZXN0VG9rZW4gPT09IHJlcXVlc3RUb2tlbilcblxuICAgIHJldHVybiBlbnRyeSA/IHtcbiAgICAgIHJlcXVlc3RJRDogZW50cnlbMF0sXG4gICAgICBidWZmZXJlZFJlc3BvbnNlOiBlbnRyeVsxXVxuICAgIH0gOiB1bmRlZmluZWRcbiAgfVxuXG4gIC8vIERlbGV0ZXMgYW4gZXhpc3RpbmcgYnVmZmVyZWRSZXNwb25zZSBmcm9tIHRoZSByZXNwb25zZUJ1ZmZlclxuICByZXNwb25zZUJ1ZmZlci5yZW1vdmUgPSAocmVxdWVzdElEKSA9PlxuICAgIGRlbGV0ZSByZXNwb25zZUJ1ZmZlci5fYnVmZmVyW3JlcXVlc3RJRF1cblxuICByZXR1cm4gcmVzcG9uc2VCdWZmZXJcbn1cblxuLy8gQ3JlYXRlIGEgYnVmZmVyZWQgcmVzcG9uc2UgdG8gYmUgYWRkZWQgdG8gdGhlIHJlc3BvbnNlIGJ1ZmZlclxuY29uc3QgY3JlYXRlQnVmZmVyZWRSZXNwb25zZSA9ICgpID0+IHtcbiAgY29uc3QgYnVmZmVyZWRSZXNwb25zZSA9IHtcbiAgICAvLyBUT0RPOiB0aGlzIGlzIG5vdCBzZWN1cmUsIG1ha2UgaXQgbW9yZSBjcnlwdGljXG4gICAgcmVxdWVzdFRva2VuOiBEYXRlLm5vdygpLFxuICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgc3VjY2VlZGVkOiBmYWxzZSxcbiAgICByZXNwb25zZTogbnVsbCxcbiAgICBlcnJvcjogbnVsbCxcbiAgICBjcmVhdGlvblRpbWU6IERhdGUubm93KClcbiAgfVxuICAvLyBDYWxsZWQgb25jZSB0aGUgdW5kZXJseWluZyBhc3luYyB0YXNrIHN1Y2NlZWRzXG4gIGJ1ZmZlcmVkUmVzcG9uc2UucmVzb2x2ZSA9IChyZXNwb25zZSkgPT4ge1xuICAgIGJ1ZmZlcmVkUmVzcG9uc2UuY29tcGxldGVkID0gdHJ1ZVxuICAgIGJ1ZmZlcmVkUmVzcG9uc2Uuc3VjY2VlZGVkID0gdHJ1ZVxuICAgIGJ1ZmZlcmVkUmVzcG9uc2UucmVzcG9uc2UgPSByZXNwb25zZVxuICB9XG4gIC8vIENhbGxlZCBvbmNlIHRoZSB1bmRlcmx5aW5nIGFzeW5jIHRhc2sgZmFpbHNcbiAgYnVmZmVyZWRSZXNwb25zZS5yZWplY3QgPSAoZXJyb3IpID0+IHtcbiAgICBidWZmZXJlZFJlc3BvbnNlLmNvbXBsZXRlZCA9IHRydWVcbiAgICBidWZmZXJlZFJlc3BvbnNlLnN1Y2NlZWRlZCA9IGZhbHNlXG4gICAgYnVmZmVyZWRSZXNwb25zZS5lcnJvciA9IGVycm9yXG4gIH1cblxuICByZXR1cm4gYnVmZmVyZWRSZXNwb25zZVxufVxuXG4vLyBTZXQgdGhlIHJlbGV2YW50IG1ldGhvZCBpbnRvIHRoZSByZXNwb25zZSBvYmplY3RcbmNvbnN0IGRlY29yYXRlUmVzcG9uc2VPYmplY3QgPSAocmVzLCBidWZmZXJlZFJlc3BvbnNlKSA9PiB7XG4gIHJlcy5zZXRCdWZmZXJlZFJlc3BvbnNlID0gKGFzeW5jVGFzaykgPT4ge1xuICAgIGlmICghYXN5bmNUYXNrLnRoZW4gfHwgIWFzeW5jVGFzay5jYXRjaCkge1xuICAgICAgLy8gSWYgdGhlIHVuZGVybHlpbmcgdGFzayBpcyBub3QgYXN5bmNocm9ub3VzLCB0aGUgdGhyb3cgYW4gZXJyb3JcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFzayBtdXN0IGJlIGEgcHJvbWlzZScpXG4gICAgfVxuICAgIGFzeW5jVGFza1xuICAgICAgLnRoZW4oYnVmZmVyZWRSZXNwb25zZS5yZXNvbHZlKVxuICAgICAgLmNhdGNoKGJ1ZmZlcmVkUmVzcG9uc2UucmVqZWN0KVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZVJlcXVlc3RGb3JOZXdUYXNrID0gKHJlcywgbmV4dCwgcmVzcG9uc2VCdWZmZXIpID0+IHtcbiAgY29uc3QgcmVxdWVzdElEID0gcmVzcG9uc2VCdWZmZXIuZ2V0TmV3SUQoKVxuXG4gIGlmIChyZXF1ZXN0SUQgPT09IHVuZGVmaW5lZCkge1xuICAgIHJlcy5zdGF0dXMoNTAzKS5qc29uKHsgZXJyb3I6ICdSZXF1ZXN0IHF1ZXVlIGlzIG92ZXJsb2FkZWQuJyB9KVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ1ZmZlcmVkUmVzcG9uc2UgPSBjcmVhdGVCdWZmZXJlZFJlc3BvbnNlKClcblxuICAgIHJlc3BvbnNlQnVmZmVyLnB1c2gocmVxdWVzdElELCBidWZmZXJlZFJlc3BvbnNlKVxuICAgIGRlY29yYXRlUmVzcG9uc2VPYmplY3QocmVzLCBidWZmZXJlZFJlc3BvbnNlKVxuICAgIG5leHQoKVxuICAgIHJlcy5zdGF0dXMoMjAyKS5qc29uKHsgcmVxdWVzdFRva2VuOiBidWZmZXJlZFJlc3BvbnNlLnJlcXVlc3RUb2tlbiB9KVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZVJlcXVlc3RGb3JCdWZmZXJlZFRhc2sgPSBkZWJ1ZyA9PlxuICAocmVxdWVzdFRva2VuLCByZXMsIHJlc3BvbnNlQnVmZmVyKSA9PiB7XG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0ID0gcmVzcG9uc2VCdWZmZXIuc2VhcmNoKHJlcXVlc3RUb2tlbilcblxuICAgIGlmIChzZWFyY2hSZXN1bHQpIHtcbiAgICAgIGNvbnN0IHsgcmVxdWVzdElELCBidWZmZXJlZFJlc3BvbnNlIH0gPSBzZWFyY2hSZXN1bHRcblxuICAgICAgaWYgKGJ1ZmZlcmVkUmVzcG9uc2UuY29tcGxldGVkKSB7XG4gICAgICAgIHJlc3BvbnNlQnVmZmVyLnJlbW92ZShyZXF1ZXN0SUQpXG5cbiAgICAgICAgaWYgKGJ1ZmZlcmVkUmVzcG9uc2Uuc3VjY2VlZGVkKSB7XG4gICAgICAgICAgLy8gVE9ETzogdGVzdCBmb3IgY2FzZXMgd2hlcmUgcmVzcG9uc2UgaXMgbm90IGFuIG9iamVjdFxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGJ1ZmZlcmVkUmVzcG9uc2UucmVzcG9uc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzLnN0YXR1cyg1MDApXG4gICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGJ1ZmZlcmVkUmVzcG9uc2UuZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgICAgc3RhY2s6IGJ1ZmZlcmVkUmVzcG9uc2UuZXJyb3Iuc3RhY2tcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ0Vycm9yJyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnNlbmRTdGF0dXMoMjAyKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXMuc2VuZFN0YXR1cyg0MDQpXG4gICAgfVxuICB9XG5cbi8qKlxuICogVGhlIFJlcXVlc3RCdWZmZXIgbWlkZGxld2FyZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJlcXVlc3RCdWZmZXJMaW1pdCB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVyXG4gKiBAcGFyYW0ge051bWJlcn0gdHRsIHRoZSBtYXhpbXVtIHRpbWUgKGluIG1pbGxpc2Vjb25kcykgdG8gbGl2ZSBmb3IgZWFjaCBhc3luY1xuICogICAgICAgICAgICAgICB0YXNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0ICh7IHJlcXVlc3RCdWZmZXJMaW1pdCwgdHRsLCBkZWJ1ZyB9KSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlQnVmZmVyID0gY3JlYXRlUmVzcG9uc2VCdWZmZXIocmVxdWVzdEJ1ZmZlckxpbWl0LCB0dGwpXG5cbiAgcmV0dXJuIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGlmIChyZXEuYm9keS5yZXF1ZXN0VG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlUmVxdWVzdEZvck5ld1Rhc2socmVzLCBuZXh0LCByZXNwb25zZUJ1ZmZlcilcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVxdWVzdFRva2VuID0gcmVxLmJvZHkucmVxdWVzdFRva2VuXG5cbiAgICAgIGhhbmRsZVJlcXVlc3RGb3JCdWZmZXJlZFRhc2soZGVidWcpKHJlcXVlc3RUb2tlbiwgcmVzLCByZXNwb25zZUJ1ZmZlcilcbiAgICB9XG4gIH1cbn1cbiJdfQ==