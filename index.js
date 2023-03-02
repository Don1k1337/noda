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
