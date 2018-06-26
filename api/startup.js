var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

function run() {

    const port = 3000

    var users = require('./controllers/users')
    var swagger = require('./controllers/swagger')
    
    var app = express()
    
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
    
    app.use('/api/users', users)
    app.use('/api/docs', swagger.router)
    
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      var err = new Error('Not Found')
      err.status = 404
      next(err)
    })
    
    // error handler
    app.use(function (err, req, res, next) {
      console.error(`Error catched! ${err}`)
    
      const error = {
        status: err.status || 500,
        message: err.message
      }
    
      res.status(error.status).send(error)
    })

    return app;
}

function onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }
  
    const bind = typeof port === 'string'
          ? 'Pipe ' + port
          : 'Port ' + port
  
      // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
      default:
        throw error
    }
  }
  
function onListening () {
    const addr = app.address()
    const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port
    console.log('\nListening on ' + bind)
}

module.exports = {
    run: run,
    onError: onError,
    onListening: onListening
}