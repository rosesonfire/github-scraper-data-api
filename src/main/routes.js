export default ({ dataController }) => ({
  get: {},
  post: {
    '/scrapedData': dataController.writeData
  }
})
