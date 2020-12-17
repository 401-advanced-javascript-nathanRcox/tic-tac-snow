# LAB - Class 07

## Project: Access Control

### Author: Nathan Cox

### Contributors

- Classmates: Dina Ayoub
- Code Fellows TAs: N/A

### Links and Resources

- [CI/CD](https://github.com/401-advanced-javascript-nathanRcox/bearer-auth/actions)
<!-- - [Back-end Server URL](http://xyz.com) (when applicable) -->
- [Front-end Application](https://nrc-bearer-auth.herokuapp.com/)

### Setup

#### .env requirements (where applicable)

- `PORT`= 3000
- `MONGODB_URI` = mongodb://localhost:27017/auth-api
- `SECRET` = dontlookatmeimhideous

#### How to initialize/run your application (where applicable)

- `nodemon` from the command line or;
- `node index.js`

#### How to use your library (where applicable)

#### Tests

- How do you run tests?: `npm test` from the root.
- Any tests of note?: All the tests that I wrote passed; but I didn't write all of the tests.
- Describe any tests that you did not complete, that skipped, and etc: I wrote tests for the auth routes, as required, and for v1 of the api, sans the the delete function, but I didn't get to writing any tests for v2 (authenticated). 

#### UML
![UML](./authentication-UML.png)
