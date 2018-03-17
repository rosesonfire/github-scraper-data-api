import { createDefensivePromise } from 'js-utils'

// Wrapper for the npm package 'redis'
// Replaces the redis client default functions with promise oriented functions
export default ({ redis, host, port }) => {
  const client = redis.createClient({ host, port })

  return {
    hmset: (...args) => createDefensivePromise((resolve, reject) => {
      client.hmset(...args, (err, replies) => {
        if (err) {
          reject(err)
        } else {
          resolve(replies)
        }
      })
    }),
    quit: async () => client.quit()
  }
}
