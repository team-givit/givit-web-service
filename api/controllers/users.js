import * as Swagger from './swagger'
const UserRepository = require('./../../database/userRepo');
const firestore = require('./../../database/startup');

const db = firestore.db();

const userRepo = new UserRepository(db);

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
  userRepo.get().then(response => {
    Swagger.validateModel('Users', response);
    res.send(response);
  });
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
  const response = userRepo.add(req.body);
  res.send(response)
})

module.exports = router
