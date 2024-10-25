require('dotenv').config();
require('../tmp-data/import-data')

const app = require('../app')
const http = require('http2')
const httpServer = http.createServer(app)
const port = process.env.PORT

httpServer.listen(port, () => {
  console.log(`${process.env.NAME} LISTEN ON PORT ${port}`)
})