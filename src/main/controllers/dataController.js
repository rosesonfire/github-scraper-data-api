export default ({ dataService }) => ({
  writeData: (req, res) =>
    res.setBufferedResponse(dataService.writeData(req.body.data))
})
