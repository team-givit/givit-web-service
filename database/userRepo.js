import User from '../models/user';

class UserRepository {
    
    constructor(db) {
        this.collection = db.collection("users");
    }

    add(user) {
        return new Promise((resolve, reject) => {
            if (!user instanceof User) return reject("Not a valid User");

            this.collection
                .add(user);

            resolve();
        });
    }

    get() {
        
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

module.exports = UserRepository