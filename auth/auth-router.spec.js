const request = require("supertest");
const server = require("../api/server");
const Users = require("../users/users-model");

describe("auth-router", () => {
  it("runs test suite", () => {
    expect(true).toBe(true);
  });
});

describe("POST api/auth/login", () => {

  it("returns json on login success", () => {
    return request(server)
      .post("/api/auth/login")
      .then(res => {
        expect(res.type).toMatch(/json/);
      });
  });


});

describe('POST api/auth/register', () => {
  let data = {
    "id": "88",
    "username": "Amber",
    "password": "testing123"
  }

  it('responds with 201 created', done => {
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
})