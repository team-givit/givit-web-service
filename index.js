// Create a server with a host and port
const createServer = require('./lib/infrastructure/webserver/server');
const firestore = require('./lib/infrastructure/database/firebase');


// Start the server
const start = async () => {

  try {
    firestore.initialize();

    const server = await createServer();
    await server.start();
    
    console.log('Server running at:', server.info.uri);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();