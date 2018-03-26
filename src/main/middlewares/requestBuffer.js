// TODO: test for invalid url
// TODO: authentication and secret keys
/**
 * Creates a response buffer
 * @param {Number} requestBufferLimit the size of the buffer
 * @param {Number} ttl the maximum time (in milliseconds) to live for each async
 *                     task
 */
const createResponseBuffer = (requestBufferLimit, ttl) => {
  const responseBuffer = {
    _buffer: {}
  }
  const requestIDs = Array(requestBufferLimit).fill(0)
    .map((value, index) => index)

  // Removes the timedout buffered responses from the response buffer
  responseBuffer.clean = () => {
    const now = Date.now()
    const buffer = responseBuffer._buffer

    Object.keys(buffer).forEach(requestID => {
      if (now - buffer[requestID].creationTime > ttl) {
        delete buffer[requestID]
      }
    })
  }

  // Gets the id of an available slot in the buffer
  responseBuffer.getNewID = () => {
    const buffer = responseBuffer._buffer

    responseBuffer.clean()

    return requestIDs.find(id => !(id in buffer))
  }

  // Pushes a new bufferedResponse into the responseBuffer
  responseBuffer.push = (requestID, bufferedResponse) => {
    responseBuffer._buffer[requestID] = bufferedResponse
  }

  // Gets an existing bufferedResponse from the responseBuffer
  responseBuffer.search = (requestToken) => {
    const entry = Object.entries(responseBuffer._buffer)
      .find(([requestID, bufferedResponse]) =>
        bufferedResponse.requestToken === requestToken)

    return entry ? {
      requestID: entry[0],
      bufferedResponse: entry[1]
    } : undefined
  }

  // Deletes an existing bufferedResponse from the responseBuffer
  responseBuffer.remove = (requestID) =>
    delete responseBuffer._buffer[requestID]

  return responseBuffer
}

// Create a buffered response to be added to the response buffer
const createBufferedResponse = () => {
  const bufferedResponse = {
    // TODO: this is not secure, make it more cryptic
    requestToken: Date.now(),
    completed: false,
    succeeded: false,
    response: null,
    error: null,
    creationTime: Date.now()
  }
  // Called once the underlying async task succeeds
  bufferedResponse.resolve = (response) => {
    bufferedResponse.completed = true
    bufferedResponse.succeeded = true
    bufferedResponse.response = response
  }
  // Called once the underlying async task fails
  bufferedResponse.reject = (error) => {
    bufferedResponse.completed = true
    bufferedResponse.succeeded = false
    bufferedResponse.error = error
  }

  return bufferedResponse
}

// Set the relevant method into the response object
const decorateResponseObject = (res, bufferedResponse) => {
  res.setBufferedResponse = (asyncTask) => {
    if (!asyncTask.then || !asyncTask.catch) {
      // If the underlying task is not asynchronous, the throw an error
      throw new Error('Task must be a promise')
    }
    asyncTask
      .then(bufferedResponse.resolve)
      .catch(bufferedResponse.reject)
  }
}

const handleRequestForNewTask = (res, next, responseBuffer) => {
  const requestID = responseBuffer.getNewID()

  if (requestID === undefined) {
    res.status(503).json({ error: 'Request queue is overloaded.' })
  } else {
    const bufferedResponse = createBufferedResponse()

    responseBuffer.push(requestID, bufferedResponse)
    decorateResponseObject(res, bufferedResponse)
    next()
    res.status(202).json({ requestToken: bufferedResponse.requestToken })
  }
}

const handleRequestForBufferedTask = debug =>
  (requestToken, res, responseBuffer) => {
    const searchResult = responseBuffer.search(requestToken)

    if (searchResult) {
      const { requestID, bufferedResponse } = searchResult

      if (bufferedResponse.completed) {
        responseBuffer.remove(requestID)

        if (bufferedResponse.succeeded) {
          // TODO: test for cases where response is not an object
          res.status(200).json(bufferedResponse.response)
        } else {
          res.status(500)
          if (debug) {
            res.json({
              message: bufferedResponse.error.message,
              stack: bufferedResponse.error.stack
            })
          } else {
            res.json({ message: 'Error' })
          }
        }
      } else {
        res.sendStatus(202)
      }
    } else {
      res.sendStatus(404)
    }
  }

/**
 * The RequestBuffer middleware
 * @param {Number} requestBufferLimit the size of the buffer
 * @param {Number} ttl the maximum time (in milliseconds) to live for each async
 *               task
 */
export default ({ requestBufferLimit, ttl, debug }) => {
  const responseBuffer = createResponseBuffer(requestBufferLimit, ttl)

  return (req, res, next) => {
    if (req.body.requestToken === undefined) {
      handleRequestForNewTask(res, next, responseBuffer)
    } else {
      const requestToken = req.body.requestToken

      handleRequestForBufferedTask(debug)(requestToken, res, responseBuffer)
    }
  }
}
