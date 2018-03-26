export default {
  debug: true,
  scraperDataAPI: {
    port: 8080,
    requestBuffer: {
      bufferLimit: 10,
      ttl: 10000
    }
  },
  db: {
    host: 'localhost',
    port: 6379
  }
}
