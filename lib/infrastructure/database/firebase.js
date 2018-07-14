const admin = require('firebase-admin');

function initialize() {
    //Get yo own acc key
    var serviceAccount = require('./accKey.json');

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://givit-app.firebaseio.com'
    });
}

module.exports = {
    initialize: initialize,
    db: admin.firestore,
}