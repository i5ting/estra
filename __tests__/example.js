const path = require('path');
const request = require('supertest');


console.dir("-----")
console.dir(path.join(__dirname, '../example'))

const estra = require('../index')
const app = estra(path.join(__dirname, '../example/src'))

const requireDir = require('require-dir')

const all = requireDir(path.join(__dirname, '../example/src'), { recurse: true })
console.dir((dir))
console.dir((all))

// describe('First test case', () => {
//     it('test xxx', () => {
   
//         request(app)
//             .get('/')
//             // .expect('Content-Type', /json/)
//             // .expect('Content-Length', '15')
//             .expect(200)
//             .end(function(err, res) {
//                 if (err) throw err;
//             });
//         // expect('').toBe('');
//     });
// })
