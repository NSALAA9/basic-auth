// const request = require('supertest');
// const app = require('../src/server');


// describe('Authentication API', () => {
//   it('should create a new user on signup', async () => {
//     const response = await request(app)
//       .post('/signup')
//       .send({ username: 'testuser', password: 'password123' });

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('id');
//     expect(response.body.username).toBe('testuser');
//   });

//   it('should return 403 for invalid signup request', async () => {
//     const response = await request(app)
//       .post('/signup')
//       .send({});

//     expect(response.status).toBe(403);
//     expect(response.text).toBe('Error Creating User');
//   });

//   it('should login a user on signin', async () => {
//     const response = await request(app)
//       .post('/signin')
//       .set('Authorization', `Basic ${Buffer.from('testuser:password123').toString('base64')}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('id');
//     expect(response.body.username).toBe('testuser');
//   });

//   it('should return 403 for invalid login request', async () => {
//     const response = await request(app)
//       .post('/signin')
//       .set('Authorization', 'Basic invalidcredentials');

//     expect(response.status).toBe(403);
//     expect(response.text).toBe('Invalid Login');
//   });
// });



// 'use strict'

// const { app } = require("../src/server");
// const { DB } = require("../src/auth/models/index");
// const supertest = require('supertest');
// const mockServer = supertest(app);
// const base64 = require('base-64')
// const basicAuthMiddleWare = require('../src/auth/middleware/basic')

// beforeAll(async () => {
//   await DB.sync();
// });

// afterAll(async () => {
//   await DB.drop();
// });
  
// // Test endpoints
// describe('Test the signin & signup endpoints', () => {

//   it(' POST to /signup to create a new user.  ', async () => {
//     const result = await mockServer.post('/signup').send({
//       userName: 'Alaa',
//       password: '1234'
//     });
//     expect(result.status).toEqual(201);
//   });

//   it('POST to /signin to login as a user (use basic auth).  ', async () => {
//     const req = {
//       headers: {
//         authorization: `Basic ${base64.encode('Alaa:1234')}`
//       },
//       body: {
//         userName: undefined
//       }
//     };

//     const res = {};
//     const next = jest.fn();
//     await basicAuthMiddleWare(req, res, next);
//     expect(next).toHaveBeenCalled();
//   });
// });
// const basicAuth = require('../src/auth/middleware/basic');
// const bcrypt = require('bcrypt');
// const { Users } = require('../src/auth/models/index');


// jest.mock('bcrypt');
// jest.mock('../src/auth/models/index');

// describe('Basic Auth Middleware', () => {
//   let req;
//   let res;
//   let next;

//   beforeEach(() => {
//     req = {
//       headers: {
//         authorization: 'Basic am9objpmb28=' // username: john, password: foo
//       }
//     };

//     res = {
//       status: jest.fn(() => res),
//       send: jest.fn()
//     };

//     next = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should authorize a valid user', async () => {
//     const user = {
//       id: 1,
//       username: 'john',
//       password: await bcrypt.hash('foo', 10)
//     };

//     Users.findOne.mockResolvedValue(user);
//     bcrypt.compare.mockResolvedValue(true);

//     await basicAuth(req, res, next);

//     expect(res.status).not.toHaveBeenCalled();
//     expect(res.send).not.toHaveBeenCalled();
//     expect(next).toHaveBeenCalled();
//     expect(req.user).toBe(user);
//   });

//   it('should send 401 for missing authorization header', async () => {
//     req.headers.authorization = undefined;

//     await basicAuth(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.send).toHaveBeenCalledWith('Unauthorized');
//     expect(next).not.toHaveBeenCalled();
//   });

//   it('should send 401 for user not found', async () => {
//     Users.findOne.mockResolvedValue(null);

//     await basicAuth(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.send).toHaveBeenCalledWith('Unauthorized');
//     expect(next).not.toHaveBeenCalled();
//   });

//   it('should send 401 for incorrect password', async () => {
//     const user = {
//       id: 1,
//       username: 'john',
//       password: await bcrypt.hash('bar', 10)
//     };

//     Users.findOne.mockResolvedValue(user);
//     bcrypt.compare.mockResolvedValue(false);

//     await basicAuth(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.send).toHaveBeenCalledWith('Unauthorized');
//     expect(next).not.toHaveBeenCalled();
//   });

//   it('should send 500 for server error', async () => {
//     Users.findOne.mockRejectedValue(new Error('Database error'));

//     await basicAuth(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith('Internal Server Error');
//     expect(next).not.toHaveBeenCalled();
//   });
// });



'use strict'

const { app } = require("../src/server");
const { DB } = require("../src/auth/models/index");
const supertest = require('supertest');
const mockServer = supertest(app);
const base64 = require('base-64')
const basicAuthMiddleWare = require('../src/auth/middleware/basic')

beforeAll(async () => {
  await DB.sync();
});

afterAll(async () => {
  await DB.drop();
});
  
// Test endpoints
describe('Test the signin & signup endpoints', () => {

  it(' POST to /signup to create a new user.  ', async () => {
    const result = await mockServer.post('/signup').send({
      userName: 'rama',
      password: '1234'
    });
    expect(result.status).toEqual(201);
  });

  it('POST to /signin to login as a user (use basic auth).  ', async () => {
    const req = {
      headers: {
        authorization: `Basic ${base64.encode('Alaa:1234')}`
      },
      body: {
        userName: undefined
      }
    };

    const res = {};
    const next = jest.fn();
    await basicAuthMiddleWare(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
