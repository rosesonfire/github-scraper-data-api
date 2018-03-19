import 'babel-polyfill'

// Recursively flattens the data
function * recurse (entry, preString) {
  const key = entry[0]
  const value = entry[1]

  if (Array.isArray(value)) {
    throw new Error('Array as value is not supported')
  } else if (typeof value === 'string') {
    if (value.indexOf(':') === -1) {
      yield `${preString}${key}`
      yield value
    } else {
      // TODO: use some escaping mechanism to support this
      throw new Error('Occurence of ":" in string value is not supported')
    }
  } else if (typeof value === 'number' ||
    typeof value === 'boolean' || value instanceof Date) {
    yield `${preString}${key}`
    yield value
  } else if (typeof value === 'object') {
    const newPreString = `${preString}${key}:`

    for (let y of flattenData(value, newPreString)) {
      yield y
    }
  } else {
    throw new Error('unknown type', typeof value)
  }
}

// Generates a flat array of an object's key and values
// Example:
//   { 'name': 'abc', 'code': 56, 'meta': { 'location': 'a' } }
//   is flattened to
//   [ 'name', 'abc', 'code', 56, 'meta:location': 'a' ]
function * flattenData (data, preString = '') {
  const entries = Object.entries(data)
  for (let i = 0, len = entries.length; i < len; i++) {
    const entry = entries[i]
    for (let y of recurse(entry, preString)) {
      yield y
    }
  }
}

const validateData = data => [...flattenData(data)]

// Generates an object from a flattened array of an the object's key and values
// Example:
//   [ 'name', 'abc', 'code', 56, 'meta:location': 'a' ]
//   is mapped to
//   { 'name': 'abc', 'code': 56, 'meta': { 'location': 'a' } }
function mapToData (flattenData) {
  const data = {}
  // for (let i = 0, len = flattenData.length; i < len; i += 2) {
  //   if (flattenData[i + 1])
  //   data[flattenData[i]] = flattenData[i + 1]
  // }
  return data
}

const createNewModelObject = (redisClient) => (key, data) => {
  validateData(data)
  return {
    key,
    data,
    save: async () => redisClient.hmset(key, ...flattenData(data))
  }
}

export default ({ redisClient }) => {
  const _createNewModelObject = createNewModelObject(redisClient)

  return {
    // Creates a new model object
    create: ({ key, data }) => _createNewModelObject(key, data),
    // Fetches data from db and creates a new model object
    get: async key => {
      const flattenData = await redisClient.hgetall(key)
      const data = mapToData(flattenData)

      return _createNewModelObject(key, data)
    }
  }
}
