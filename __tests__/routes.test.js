'use strict';

process.env.SECRET = 'bojangles';

const server = require('../src/server').server;
const supergoose = require('@code-fellows/supergoose');
const bearer = require('../src/auth/middleware/bearer');

const mockRequest = supergoose(server);

let users = {
  user: { username: 'user', password: 'password' },
  writer: { username: 'writer', password: 'password' },
  editor: { username: 'editor', password: 'password' },
  admin: { username: 'admin', password: 'password' },
};

describe('Auth Router', () => {
  Object.keys(users).forEach(userType => {
    describe(`${userType} users`, () => {
      it ('can create one user and send object (username+token to the client', async () => {
        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);
      });
      
      it('can sign-in with basic auth and send object (username+token) to the client', async () => {
        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);
        
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);
      });
    });
  });
});