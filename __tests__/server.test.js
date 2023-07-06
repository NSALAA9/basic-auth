const { app } = require("../src/server");
const { DB } = require("../src/auth/models/index");
const supertest = require('supertest');
const mockServer = supertest(app);
const base64 = require('base-64')
const basicAuthMiddleWare = require('../src/auth/middleware/basic')


describe('Authentication API', () => {
  it('should create a new user on signup', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('testuser');
  });

  it('should return 403 for invalid signup request', async () => {
    const response = await request(app)
      .post('/signup')
      .send({});

    expect(response.status).toBe(403);
    expect(response.text).toBe('Error Creating User');
  });

  it('should login a user on signin', async () => {
    const response = await request(app)
      .post('/signin')
      .set('Authorization', `Basic ${Buffer.from('testuser:password123').toString('base64')}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('testuser');
  });

  it('should return 403 for invalid login request', async () => {
    const response = await request(app)
      .post('/signin')
      .set('Authorization', 'Basic invalidcredentials');

    expect(response.status).toBe(403);
    expect(response.text).toBe('Invalid Login');
  });
});
