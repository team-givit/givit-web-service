
const firestore = require('../../infrastructure/database/firebase');
const User = require('../../domain/entities/User');
const IUserRepository = require('../../application/repositories/IUserRepository');

module.exports = class extends IUserRepository {

  constructor() {
    super();
    const db = firestore.db();
    this.collection = db.collection("users");
  }

  add(user) {
    return new Promise((resolve, reject) => {

      this.collection
        .add(user);

      resolve();
    });
  }

  list() {
    return new Promise((resolve, reject) => {

      this.collection.get().then(results => {
        var users = [];

        results.forEach(doc => {
          var user = new User(doc.data().id, doc.data().firstName, doc.data().lastName, doc.data().email);
          users.push(user);
        })

        console.log(users);

        if (users.length == 0) {
          return resolve(undefined);
        }

        return resolve(users);

      });
    });
  }
}