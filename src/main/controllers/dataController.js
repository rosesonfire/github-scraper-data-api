// TODO: make the API restful if possible
export default ({ dataService }) => ({
  writeData: (req, res) =>
    res.setBufferedResponse(dataService.writeData(req.body.data)),
  readData: (req, res) =>
    res.setBufferedResponse(dataService.readData(req.params.key))
})
