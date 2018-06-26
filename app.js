const api = require('./api/startup');
const firestore = require('./database/startup');

function startUp() {
  
  firestore.initialize();

  var app = api.run();
  const port = 3000;

  app.listen(port)
  app.on('error', api.onError)
  app.on('listening', api.onListening)

  console.log('Server started on port ' + port)
}

startUp();