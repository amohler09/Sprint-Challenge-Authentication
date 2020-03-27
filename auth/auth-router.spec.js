const request = require("supertest");
const server = require("../api/server");

describe("auth-router", () => {
  it("runs test suite", () => {
    expect(true).toBe(true);
  });

  describe("POST api/auth/login", () => {
    it('takes in req.body on login attempt', async () => {
      const res = await request(server)
        .get('/api/auth/login');
      expect.objectContaining(res.body);
    });

    it("returns json on login success", async () => {
      const res = await request(server)
        .post("/api/auth/login");
      expect(res.type).toMatch(/json/);
    });
  });

  describe('POST api/auth/register', () => {
    let data = { //dont forget to change EVERY TIME
      "id": "20",
      "username": "test4d",
      "password": "test12345"
    };

    it('returns 201 created status on successful registration', done => {
      request(server)
        .post('/api/auth/register')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err) => {
          err ? done(err) : done();
        });
    });

    it('returns 500 Error if an empty object is passed in', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({});
      expect(res.status).toBe(500);
    });
  });
});