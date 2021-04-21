const path = require('path')
const request = require('supertest')
const estra = require('../index')
const app = estra(path.join(__dirname, '../example/src'))

describe('First test case', () => {
    it('test xxx', () => {
   
        request(app)
            .get('/')
            // .expect('Content-Type', /json/)
            // .expect('Content-Length', '15')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            });
        // expect('').toBe('');
    });
})
