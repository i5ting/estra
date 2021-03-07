const http = require('http')
const router = require('find-my-way')()

router.on('GET', '/', (req, res, params) => {
  res.end('{"message":"hello world"}')
})

const server = http.createServer((req, res) => {
  router.lookup(req, res)
})

server.listen(3001, err => {
  if (err) throw err
  console.log('Server listening on: http://localhost:3001')
})