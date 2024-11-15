require('dotenv').config();
require('../tmp-data/import-data')

const app = require('../app')
const http = require('http')
const httpServer = http.createServer(app)
const port = process.env.PORT || 3000
const name = process.env.NAME || 'GAAPI'

httpServer.listen(port, () => {
  console.log(`${name} LISTEN ON PORT ${port}`)
})

module.exports = httpServer