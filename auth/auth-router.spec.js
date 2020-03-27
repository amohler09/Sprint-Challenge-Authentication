const request = require("supertest");
const server = require("../api/server");

describe("auth-router", () => {
  it("runs test suite", () => {
    expect(true).toBe(true);
  });
});

describe("POST api/auth/login", () => {
  it('takes in req.body on login attempt', () => {
    return request(server)
      .get('/api/auth/login')
      .then(res => {
        expect.objectContaining(res.body);
      });
  });

  it("returns json on login success", () => {
    return request(server)
      .post("/api/auth/login")
      .then(res => {
        expect(res.type).toMatch(/json/);
      });
  });
});

describe('POST api/auth/register', () => {
  let data = { //dont forget to change EVERY TIME
    "id": "115",
    "username": "test4",
    "password": "test1234"
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

  it('returns 500 Error if an empty object is passed in', () => {
    return request(server)
      .post('/api/auth/register')
      .send({})
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
});