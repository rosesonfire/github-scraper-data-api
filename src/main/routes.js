export default ({ dataController }) => ({
  get: {
    '^/scrapedData/:key$': dataController.readData
  },
  post: {
    '^/scrapedData$': dataController.writeData
  }
})
