// ETL's required data from endpoint to persistence
export default ({ odm }) => ({
  // TODO: promise.all will fail even if some data gets persisted
  //       so this needs to be fixed
  writeData: dataList => Promise.all(
    dataList.map(data => odm.create({ key: data.author.uri, data }).save())),
  readData: odm.get
})
