'use strict';

const UsersController = require('../../../interfaces/controllers/UsersController');
const usersController = new UsersController();

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: (request) => usersController.listUsers(request)
  },
  {
    method: 'POST',
    path: '/users',
    handler: (request) => usersController.createUser(request)
  },
];