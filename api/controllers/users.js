import * as DAO from '../daos/'
import * as Swagger from './swagger'

const dao = DAO.getInstance('memory')

const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     description: Retrieve the full list of users
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           $ref: '#/definitions/Users'
 */
router.get('/', (req, res, next) => {
  const response = dao.retrieveAll()
  Swagger.validateModel('Users', response)
  res.send(response)
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Retrieve an specific user
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the user to retrieve
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/:id', (req, res, next) => {
  const response = dao.retrieve(parseInt(req.params.id, 10))
  Swagger.validateModel('User', response)
  res.send(response)
})

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: new user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/', (req, res, next) => {
  Swagger.validateModel('User', req.body)
  const response = dao.create(req.body)
  Swagger.validateModel('User', response)
  res.send(response)
})

module.exports = router
