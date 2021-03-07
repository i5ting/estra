const estra = require('../index')
const server = estra(__dirname + '/src')

server.listen(3000, err => {
    if (err) throw err
    console.log('Server listening on: http://localhost:3000')
})
