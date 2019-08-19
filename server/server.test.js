const app = require('./server');
const supertest = require('supertest');

describe('Test root path', () => {
    test('Give us a 200 from the tree route', async () => {
        const response = await supertest(app).get('/api/tree/all');
        expect(response.statusCode).toBe(200);
    })
})

