const request = require('supertest');
const server = require('../api/server');

describe('jokes-router', () => {
    describe('GET /api/jokes', () => {
        it("runs test suite", () => {
            expect(true).toBe(true);
        });


        it('returns 401 Error if user is not authorized', () => {
            return request(server)
                .get('/api/jokes')
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });


        it('returns 200 OK if user is authorized', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({
                    username: 'Testinggasdsdfsdfsdffsdasdgff',
                    password: 'pasdasdsdsdfssdsdfasdds'
                });

            expect(res.status).toBe(201);

            const jokes = await request(server)
                .get('/api/jokes')
                .set('Authorization', res.body.token);

            expect(jokes.status).toBe(200);
            expect(jokes.type).toMatch(/json/i);
        });
    })
})