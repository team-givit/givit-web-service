const User = require('../../../domain/entities/User');

module.exports = class {

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(firstName, lastName, email) {
    const user = new User(null, firstName, lastName, email);
    return this.userRepository.add(user);
  }
};