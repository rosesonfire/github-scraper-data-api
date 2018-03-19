const makeQuery = (utils, client) => (operation) => (...args) =>
  utils.createDefensivePromise((resolve, reject) => {
    client[operation](...args, (err, replies) => {
      if (err) {
        reject(err)
      } else {
        resolve(replies)
      }
    })
  })
// Wrapper for the npm package 'redis'
// Replaces the redis client default functions with promise oriented functions
export default ({ redis, host, port, utils }) => {
  const client = redis.createClient({ host, port })
  const _makeQuery = makeQuery(utils, client)

  return {
    hmset: _makeQuery('hmset'),
    hgetall: _makeQuery('hgetall'),
    quit: async () => client.quit()
  }
}
