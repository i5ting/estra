const http = require('http')
const router = require('find-my-way')()

router.on('GET', '/', (req, res, params) => {
    res.end('{"message":"hello world"}')
})

router.on('GET', '/2', (req, res, params) => {
    res.end('{"message":"hello 2"}')
})

router.on('GET', '/3', (req, res, params) => {
    res.end('{"message":"hello 3"}')
})

const server = http.createServer((req, res) => {
    router.lookup(req, res)
})

server.listen(3000, err => {
    if (err) throw err
    console.log('Server listening on: http://localhost:3000')
})