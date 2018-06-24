import UsersMemoryDAO from './users-memory-dao'

let memoryDAO = null

export function getInstance (type) {
  if (type === 'memory') {
    if (memoryDAO === null) {
      memoryDAO = new UsersMemoryDAO()
    }
    return memoryDAO
  }
  throw new Error('Unknown DAO type ' + type)
}
