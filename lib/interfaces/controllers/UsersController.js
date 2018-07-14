const UserSerializer = require('../serializers/UserSerializer');
const ListUsers = require('../../application/use_cases/users/ListUsers');
const CreateUser = require('../../application/use_cases/users/CreateUser');
const UserRepository = require('../storage/UserRepository');

module.exports = class {

  constructor() {
    this.userSerializer = new UserSerializer();
    this.userRepository = new UserRepository();
  }

  createUser(request) {
    const { firstName, lastName, email } = request.payload;
    const useCase = new CreateUser(this.userRepository);
    return useCase.execute(firstName, lastName, email)
      .then(user => this.userSerializer.serialize(user));
  }

  listUsers() {
    const useCase = new ListUsers(this.userRepository);
    return useCase.execute()
      .then(users => users.map(this.userSerializer.serialize));
  }

};
