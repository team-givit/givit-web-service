import User from '../models/user'

export default class UsersMemoryDAO {
  constructor () {
    this.data = new Map()

    this.createUser(1, 'Testy', 'lol', 'hello@me.com')
    this.createUser(2, 'mCTester', 'Hello', 'lololol@lol.com')
    this.createUser(3, 'mcMaster', 'Loll', 'turnup@me.comß')
  }

  createUser (id, firstName, lastName, email) {
    this.data.set(id, new User(id, firstName, lastName, email))
  }

  retrieveAll () {
    return Array.from(this.data.values())
  }

  retrieve (id) {
    if (this.data.has(id)) {
      return this.data.get(id)
    } else {
      throw new Error(`User with id ${id} not found`)
    }
  }

  create (user) {
    if (this.data.has(user.id)) {
      throw new Error(`A user with id ${user.id} already exists`)
    } else {
      this.createUser(user.id, user.firstName, user.lastName, user.email)
      return this.retrieve(user.id)
    }
  }
}
