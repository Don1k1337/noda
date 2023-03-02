/*
  server.js
  This is the main file that runs the server and connects to the database.
  It imports the app module that contains the server-side logic,
  the config module that specifies the app configuration, and
  the dbConnection module that creates the connection to the database.
  It logs an error message if there's an issue connecting to the database,
  and a success message once the server is running.
*/
const app = require('./app');
const config = require('./config');
const { dbConnection} = require('./db');

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to database', err);
    return;
  }
  console.log('Connected to database');
});

app.listen(config.appPort, () => {
  console.log(`App listening on port ${config.appPort}`);
});
