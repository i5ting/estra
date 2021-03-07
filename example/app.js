
const http = require('http')
const router = require('find-my-way')()
const estra = require('../index')

const A = require('./src/a')


estra(router, A)

const server = http.createServer((req, res) => {
    router.lookup(req, res)
})

server.listen(3000, err => {
    if (err) throw err
    console.log('Server listening on: http://localhost:3000')
})
