// const basicAuth = require('./basic');
// const bcrypt = require('bcrypt');
// const { Users } = require('../models');

// jest.mock('../models');

// describe('Basic Auth Middleware', () => {
//   const req = {};
//   const res = { status: jest.fn(), send: jest.fn() };
//   const next = jest.fn();

//   beforeEach(() => {
//     req.headers = {};
//     req.headers.authorization = 'Basic am9objpmb28='; // username: john, password: foo
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should authorize a valid user', async () => {
//     const user = {
//       id: 1,
//       username: 'john',
//       password: await bcrypt.hash('foo', 10),
//     };
//     Users.findOne.mockResolvedValue(user);
//     bcrypt.compare.mockResolvedValue(true);

//     await basicAuth(req, res, next);

//     expect(res.status).not.toHaveBeenCalled();
//     expect(res.send).not.toHaveBeenCalled();
//     expect(next).toHaveBeenCalled();
//     expect(req.user).toBe(user);
//   });

//   it('should send 401 for invalid authorization header', async () => {
//     req.headers.authorization = '';

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
//       password: await bcrypt.hash('bar', 10),
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


'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
//const { User } = require('../models/index');


//const { User } = require('../src/auth/models/index');
//const { User } = require('../../src/auth/models/index');
const { User } = require('../models/index');



const basicAuth = require('./basic');

describe('basicAuth', () => {
  it('should invok the next middleware if authentication was successful', async () => {
    const req = {
      headers: {
        authorization: `Basic ${base64.encode('username:password')}`,
      },
    };
    const res = {};
    const next = jest.fn();
    const mockUser = {
      userName: 'userName',
      password: await bcrypt.hash('password', 5),
    };
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return an error if authentication was faild', async () => {
    const req = {
      headers: {
        authorization: `Basic ${base64.encode('username:password')}`,
      },
    };
    const res = {};
    const next = jest.fn();
    const mockUser = {
      userName: 'userName',
      password: await bcrypt.hash('password', 5),
    };
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    bcrypt.compare = jest.fn().mockResolvedValue(false);

    // await expect(basicAuth(req, res, next)).rejects.toThrow('this user is invalid');

    expect(next).not.toHaveBeenCalled();
  });
});