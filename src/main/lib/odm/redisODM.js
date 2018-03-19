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

// Maps data and persits it to a redis server
// Data has to be a json array
// Example:
//   [
//     { 'name': 'abc', 'code': 56 },
//     { 'name': 'efg', 'code': 84 }
//   ]
export default ({ redisClient }) => ({
  // data is the data
  // idKey is the key in the data which will be used as the id in the redis
  //   hash object
  create: ({ key, data }) => ({
    key,
    data,
    save: async () => redisClient.hmset(key, ...flattenData(data))
  })
})
