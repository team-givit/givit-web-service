/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - id
 *       - firstName
 *       - lastName
 *       - email
 *     properties:
 *       id:
 *         type: number
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *   Users:
 *     type: array
 *     items:
 *       $ref: '#/definitions/User'
 */
export default class User {
  constructor (id, firstName, lastName, email) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }
}

module.exports = User