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
    responseBuffer.clean();

    var buffer = responseBuffer._buffer;

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
    requestToken: Date.now().toString(),
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

var handleRequestForBufferedTask = function handleRequestForBufferedTask(requestToken, res, responseBuffer) {
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
        res.status(500).json(bufferedResponse.error);
      }
    } else {
      res.sendStatus(202);
    }
  } else {
    res.sendStatus(404);
  }
};

/**
 * The RequestBuffer middleware
 * @param {Number} requestBufferLimit the size of the buffer
 * @param {Number} ttl the maximum time (in milliseconds) to live for each async
 *               task
 */

exports.default = function (_ref3) {
  var requestBufferLimit = _ref3.requestBufferLimit,
      ttl = _ref3.ttl;

  var responseBuffer = createResponseBuffer(requestBufferLimit, ttl);

  return function (req, res, next) {
    if (req.body.requestToken === undefined) {
      handleRequestForNewTask(res, next, responseBuffer);
    } else {
      var requestToken = req.body.requestToken;

      handleRequestForBufferedTask(requestToken, res, responseBuffer);
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL21pZGRsZXdhcmVzL3JlcXVlc3RCdWZmZXIuanMiXSwibmFtZXMiOlsiY3JlYXRlUmVzcG9uc2VCdWZmZXIiLCJyZXF1ZXN0QnVmZmVyTGltaXQiLCJ0dGwiLCJyZXNwb25zZUJ1ZmZlciIsIl9idWZmZXIiLCJyZXF1ZXN0SURzIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwidmFsdWUiLCJpbmRleCIsImNsZWFuIiwibm93IiwiRGF0ZSIsImJ1ZmZlciIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVxdWVzdElEIiwiY3JlYXRpb25UaW1lIiwiZ2V0TmV3SUQiLCJmaW5kIiwiaWQiLCJwdXNoIiwiYnVmZmVyZWRSZXNwb25zZSIsInNlYXJjaCIsInJlcXVlc3RUb2tlbiIsImVudHJ5IiwiZW50cmllcyIsInVuZGVmaW5lZCIsInJlbW92ZSIsImNyZWF0ZUJ1ZmZlcmVkUmVzcG9uc2UiLCJ0b1N0cmluZyIsImNvbXBsZXRlZCIsInN1Y2NlZWRlZCIsInJlc3BvbnNlIiwiZXJyb3IiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGVjb3JhdGVSZXNwb25zZU9iamVjdCIsInJlcyIsInNldEJ1ZmZlcmVkUmVzcG9uc2UiLCJhc3luY1Rhc2siLCJ0aGVuIiwiY2F0Y2giLCJFcnJvciIsImhhbmRsZVJlcXVlc3RGb3JOZXdUYXNrIiwibmV4dCIsInN0YXR1cyIsImpzb24iLCJoYW5kbGVSZXF1ZXN0Rm9yQnVmZmVyZWRUYXNrIiwic2VhcmNoUmVzdWx0Iiwic2VuZFN0YXR1cyIsInJlcSIsImJvZHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOzs7Ozs7QUFNQSxJQUFNQSx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFDQyxrQkFBRCxFQUFxQkMsR0FBckIsRUFBNkI7QUFDeEQsTUFBTUMsaUJBQWlCO0FBQ3JCQyxhQUFTO0FBRFksR0FBdkI7QUFHQSxNQUFNQyxhQUFhQyxNQUFNTCxrQkFBTixFQUEwQk0sSUFBMUIs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aUJVLFNBQXJCLEVBQWdDO0FBQzlCO0FBQ0FNLFlBQUlRLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQnpCLGlCQUFpQlcsUUFBdEM7QUFDRCxPQUhELE1BR087QUFDTEssWUFBSVEsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCekIsaUJBQWlCWSxLQUF0QztBQUNEO0FBQ0YsS0FURCxNQVNPO0FBQ0xJLFVBQUlZLFVBQUosQ0FBZSxHQUFmO0FBQ0Q7QUFDRixHQWZELE1BZU87QUFDTFosUUFBSVksVUFBSixDQUFlLEdBQWY7QUFDRDtBQUNGLENBckJEOztBQXVCQTs7Ozs7OztrQkFNZSxpQkFBaUM7QUFBQSxNQUE5Qm5ELGtCQUE4QixTQUE5QkEsa0JBQThCO0FBQUEsTUFBVkMsR0FBVSxTQUFWQSxHQUFVOztBQUM5QyxNQUFNQyxpQkFBaUJILHFCQUFxQkMsa0JBQXJCLEVBQXlDQyxHQUF6QyxDQUF2Qjs7QUFFQSxTQUFPLFVBQUNtRCxHQUFELEVBQU1iLEdBQU4sRUFBV08sSUFBWCxFQUFvQjtBQUN6QixRQUFJTSxJQUFJQyxJQUFKLENBQVM1QixZQUFULEtBQTBCRyxTQUE5QixFQUF5QztBQUN2Q2lCLDhCQUF3Qk4sR0FBeEIsRUFBNkJPLElBQTdCLEVBQW1DNUMsY0FBbkM7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFNdUIsZUFBZTJCLElBQUlDLElBQUosQ0FBUzVCLFlBQTlCOztBQUVBd0IsbUNBQTZCeEIsWUFBN0IsRUFBMkNjLEdBQTNDLEVBQWdEckMsY0FBaEQ7QUFDRDtBQUNGLEdBUkQ7QUFTRCxDIiwiZmlsZSI6InJlcXVlc3RCdWZmZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPOiB0ZXN0IGZvciBpbnZhbGlkIHVybFxuLy8gVE9ETzogYXV0aGVudGljYXRpb24gYW5kIHNlY3JldCBrZXlzXG4vKipcbiAqIENyZWF0ZXMgYSByZXNwb25zZSBidWZmZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSByZXF1ZXN0QnVmZmVyTGltaXQgdGhlIHNpemUgb2YgdGhlIGJ1ZmZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHR0bCB0aGUgbWF4aW11bSB0aW1lIChpbiBtaWxsaXNlY29uZHMpIHRvIGxpdmUgZm9yIGVhY2ggYXN5bmNcbiAqICAgICAgICAgICAgICAgICAgICAgdGFza1xuICovXG5jb25zdCBjcmVhdGVSZXNwb25zZUJ1ZmZlciA9IChyZXF1ZXN0QnVmZmVyTGltaXQsIHR0bCkgPT4ge1xuICBjb25zdCByZXNwb25zZUJ1ZmZlciA9IHtcbiAgICBfYnVmZmVyOiB7fVxuICB9XG4gIGNvbnN0IHJlcXVlc3RJRHMgPSBBcnJheShyZXF1ZXN0QnVmZmVyTGltaXQpLmZpbGwoMClcbiAgICAubWFwKCh2YWx1ZSwgaW5kZXgpID0+IGluZGV4KVxuXG4gIC8vIFJlbW92ZXMgdGhlIHRpbWVkb3V0IGJ1ZmZlcmVkIHJlc3BvbnNlcyBmcm9tIHRoZSByZXNwb25zZSBidWZmZXJcbiAgcmVzcG9uc2VCdWZmZXIuY2xlYW4gPSAoKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxuICAgIGNvbnN0IGJ1ZmZlciA9IHJlc3BvbnNlQnVmZmVyLl9idWZmZXJcblxuICAgIE9iamVjdC5rZXlzKGJ1ZmZlcikuZm9yRWFjaChyZXF1ZXN0SUQgPT4ge1xuICAgICAgaWYgKG5vdyAtIGJ1ZmZlcltyZXF1ZXN0SURdLmNyZWF0aW9uVGltZSA+IHR0bCkge1xuICAgICAgICBkZWxldGUgYnVmZmVyW3JlcXVlc3RJRF1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gR2V0cyB0aGUgaWQgb2YgYW4gYXZhaWxhYmxlIHNsb3QgaW4gdGhlIGJ1ZmZlclxuICByZXNwb25zZUJ1ZmZlci5nZXROZXdJRCA9ICgpID0+IHtcbiAgICByZXNwb25zZUJ1ZmZlci5jbGVhbigpXG5cbiAgICBjb25zdCBidWZmZXIgPSByZXNwb25zZUJ1ZmZlci5fYnVmZmVyXG5cbiAgICByZXR1cm4gcmVxdWVzdElEcy5maW5kKGlkID0+ICEoaWQgaW4gYnVmZmVyKSlcbiAgfVxuXG4gIC8vIFB1c2hlcyBhIG5ldyBidWZmZXJlZFJlc3BvbnNlIGludG8gdGhlIHJlc3BvbnNlQnVmZmVyXG4gIHJlc3BvbnNlQnVmZmVyLnB1c2ggPSAocmVxdWVzdElELCBidWZmZXJlZFJlc3BvbnNlKSA9PiB7XG4gICAgcmVzcG9uc2VCdWZmZXIuX2J1ZmZlcltyZXF1ZXN0SURdID0gYnVmZmVyZWRSZXNwb25zZVxuICB9XG5cbiAgLy8gR2V0cyBhbiBleGlzdGluZyBidWZmZXJlZFJlc3BvbnNlIGZyb20gdGhlIHJlc3BvbnNlQnVmZmVyXG4gIHJlc3BvbnNlQnVmZmVyLnNlYXJjaCA9IChyZXF1ZXN0VG9rZW4pID0+IHtcbiAgICBjb25zdCBlbnRyeSA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlQnVmZmVyLl9idWZmZXIpXG4gICAgICAuZmluZCgoW3JlcXVlc3RJRCwgYnVmZmVyZWRSZXNwb25zZV0pID0+XG4gICAgICAgIGJ1ZmZlcmVkUmVzcG9uc2UucmVxdWVzdFRva2VuID09PSByZXF1ZXN0VG9rZW4pXG5cbiAgICByZXR1cm4gZW50cnkgPyB7XG4gICAgICByZXF1ZXN0SUQ6IGVudHJ5WzBdLFxuICAgICAgYnVmZmVyZWRSZXNwb25zZTogZW50cnlbMV1cbiAgICB9IDogdW5kZWZpbmVkXG4gIH1cblxuICAvLyBEZWxldGVzIGFuIGV4aXN0aW5nIGJ1ZmZlcmVkUmVzcG9uc2UgZnJvbSB0aGUgcmVzcG9uc2VCdWZmZXJcbiAgcmVzcG9uc2VCdWZmZXIucmVtb3ZlID0gKHJlcXVlc3RJRCkgPT5cbiAgICBkZWxldGUgcmVzcG9uc2VCdWZmZXIuX2J1ZmZlcltyZXF1ZXN0SURdXG5cbiAgcmV0dXJuIHJlc3BvbnNlQnVmZmVyXG59XG5cbi8vIENyZWF0ZSBhIGJ1ZmZlcmVkIHJlc3BvbnNlIHRvIGJlIGFkZGVkIHRvIHRoZSByZXNwb25zZSBidWZmZXJcbmNvbnN0IGNyZWF0ZUJ1ZmZlcmVkUmVzcG9uc2UgPSAoKSA9PiB7XG4gIGNvbnN0IGJ1ZmZlcmVkUmVzcG9uc2UgPSB7XG4gICAgLy8gVE9ETzogdGhpcyBpcyBub3Qgc2VjdXJlLCBtYWtlIGl0IG1vcmUgY3J5cHRpY1xuICAgIHJlcXVlc3RUb2tlbjogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgc3VjY2VlZGVkOiBmYWxzZSxcbiAgICByZXNwb25zZTogbnVsbCxcbiAgICBlcnJvcjogbnVsbCxcbiAgICBjcmVhdGlvblRpbWU6IERhdGUubm93KClcbiAgfVxuICAvLyBDYWxsZWQgb25jZSB0aGUgdW5kZXJseWluZyBhc3luYyB0YXNrIHN1Y2NlZWRzXG4gIGJ1ZmZlcmVkUmVzcG9uc2UucmVzb2x2ZSA9IChyZXNwb25zZSkgPT4ge1xuICAgIGJ1ZmZlcmVkUmVzcG9uc2UuY29tcGxldGVkID0gdHJ1ZVxuICAgIGJ1ZmZlcmVkUmVzcG9uc2Uuc3VjY2VlZGVkID0gdHJ1ZVxuICAgIGJ1ZmZlcmVkUmVzcG9uc2UucmVzcG9uc2UgPSByZXNwb25zZVxuICB9XG4gIC8vIENhbGxlZCBvbmNlIHRoZSB1bmRlcmx5aW5nIGFzeW5jIHRhc2sgZmFpbHNcbiAgYnVmZmVyZWRSZXNwb25zZS5yZWplY3QgPSAoZXJyb3IpID0+IHtcbiAgICBidWZmZXJlZFJlc3BvbnNlLmNvbXBsZXRlZCA9IHRydWVcbiAgICBidWZmZXJlZFJlc3BvbnNlLnN1Y2NlZWRlZCA9IGZhbHNlXG4gICAgYnVmZmVyZWRSZXNwb25zZS5lcnJvciA9IGVycm9yXG4gIH1cblxuICByZXR1cm4gYnVmZmVyZWRSZXNwb25zZVxufVxuXG4vLyBTZXQgdGhlIHJlbGV2YW50IG1ldGhvZCBpbnRvIHRoZSByZXNwb25zZSBvYmplY3RcbmNvbnN0IGRlY29yYXRlUmVzcG9uc2VPYmplY3QgPSAocmVzLCBidWZmZXJlZFJlc3BvbnNlKSA9PiB7XG4gIHJlcy5zZXRCdWZmZXJlZFJlc3BvbnNlID0gKGFzeW5jVGFzaykgPT4ge1xuICAgIGlmICghYXN5bmNUYXNrLnRoZW4gfHwgIWFzeW5jVGFzay5jYXRjaCkge1xuICAgICAgLy8gSWYgdGhlIHVuZGVybHlpbmcgdGFzayBpcyBub3QgYXN5bmNocm9ub3VzLCB0aGUgdGhyb3cgYW4gZXJyb3JcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFzayBtdXN0IGJlIGEgcHJvbWlzZScpXG4gICAgfVxuICAgIGFzeW5jVGFza1xuICAgICAgLnRoZW4oYnVmZmVyZWRSZXNwb25zZS5yZXNvbHZlKVxuICAgICAgLmNhdGNoKGJ1ZmZlcmVkUmVzcG9uc2UucmVqZWN0KVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZVJlcXVlc3RGb3JOZXdUYXNrID0gKHJlcywgbmV4dCwgcmVzcG9uc2VCdWZmZXIpID0+IHtcbiAgY29uc3QgcmVxdWVzdElEID0gcmVzcG9uc2VCdWZmZXIuZ2V0TmV3SUQoKVxuXG4gIGlmIChyZXF1ZXN0SUQgPT09IHVuZGVmaW5lZCkge1xuICAgIHJlcy5zdGF0dXMoNTAzKS5qc29uKHsgZXJyb3I6ICdSZXF1ZXN0IHF1ZXVlIGlzIG92ZXJsb2FkZWQuJyB9KVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ1ZmZlcmVkUmVzcG9uc2UgPSBjcmVhdGVCdWZmZXJlZFJlc3BvbnNlKClcblxuICAgIHJlc3BvbnNlQnVmZmVyLnB1c2gocmVxdWVzdElELCBidWZmZXJlZFJlc3BvbnNlKVxuICAgIGRlY29yYXRlUmVzcG9uc2VPYmplY3QocmVzLCBidWZmZXJlZFJlc3BvbnNlKVxuICAgIG5leHQoKVxuICAgIHJlcy5zdGF0dXMoMjAyKS5qc29uKHsgcmVxdWVzdFRva2VuOiBidWZmZXJlZFJlc3BvbnNlLnJlcXVlc3RUb2tlbiB9KVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZVJlcXVlc3RGb3JCdWZmZXJlZFRhc2sgPSAocmVxdWVzdFRva2VuLCByZXMsIHJlc3BvbnNlQnVmZmVyKSA9PiB7XG4gIGNvbnN0IHNlYXJjaFJlc3VsdCA9IHJlc3BvbnNlQnVmZmVyLnNlYXJjaChyZXF1ZXN0VG9rZW4pXG5cbiAgaWYgKHNlYXJjaFJlc3VsdCkge1xuICAgIGNvbnN0IHsgcmVxdWVzdElELCBidWZmZXJlZFJlc3BvbnNlIH0gPSBzZWFyY2hSZXN1bHRcblxuICAgIGlmIChidWZmZXJlZFJlc3BvbnNlLmNvbXBsZXRlZCkge1xuICAgICAgcmVzcG9uc2VCdWZmZXIucmVtb3ZlKHJlcXVlc3RJRClcblxuICAgICAgaWYgKGJ1ZmZlcmVkUmVzcG9uc2Uuc3VjY2VlZGVkKSB7XG4gICAgICAgIC8vIFRPRE86IHRlc3QgZm9yIGNhc2VzIHdoZXJlIHJlc3BvbnNlIGlzIG5vdCBhbiBvYmplY3RcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYnVmZmVyZWRSZXNwb25zZS5yZXNwb25zZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKGJ1ZmZlcmVkUmVzcG9uc2UuZXJyb3IpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5zZW5kU3RhdHVzKDIwMilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzLnNlbmRTdGF0dXMoNDA0KVxuICB9XG59XG5cbi8qKlxuICogVGhlIFJlcXVlc3RCdWZmZXIgbWlkZGxld2FyZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJlcXVlc3RCdWZmZXJMaW1pdCB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVyXG4gKiBAcGFyYW0ge051bWJlcn0gdHRsIHRoZSBtYXhpbXVtIHRpbWUgKGluIG1pbGxpc2Vjb25kcykgdG8gbGl2ZSBmb3IgZWFjaCBhc3luY1xuICogICAgICAgICAgICAgICB0YXNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0ICh7IHJlcXVlc3RCdWZmZXJMaW1pdCwgdHRsIH0pID0+IHtcbiAgY29uc3QgcmVzcG9uc2VCdWZmZXIgPSBjcmVhdGVSZXNwb25zZUJ1ZmZlcihyZXF1ZXN0QnVmZmVyTGltaXQsIHR0bClcblxuICByZXR1cm4gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgaWYgKHJlcS5ib2R5LnJlcXVlc3RUb2tlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVSZXF1ZXN0Rm9yTmV3VGFzayhyZXMsIG5leHQsIHJlc3BvbnNlQnVmZmVyKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZXF1ZXN0VG9rZW4gPSByZXEuYm9keS5yZXF1ZXN0VG9rZW5cblxuICAgICAgaGFuZGxlUmVxdWVzdEZvckJ1ZmZlcmVkVGFzayhyZXF1ZXN0VG9rZW4sIHJlcywgcmVzcG9uc2VCdWZmZXIpXG4gICAgfVxuICB9XG59XG4iXX0=