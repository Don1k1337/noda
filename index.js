// .env config read
const dotenv = require('dotenv');
dotenv.config();
// express and db init
const express = require('express');
const util = require('util');
const mysql = require('mysql')

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
})

const app = express();
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// session init
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// main db query init
const query = util
    .promisify(db.query)
    .bind(db);

// Requests
app.get('/', async (req, res) => {
  try {
    const messages = await query('SELECT * FROM messages');
    res.render('index', { messages, session: req.session });
  } catch (e) {
    console.error('Failed to load entries from db', e);
    res.status(500).end();
  }
});

app.post('/message/create', async(req, res) => {
  const body = req.body
  const name = body.name
  const message = body.message
  try {
    if (name && message) {
      await query(`INSERT INTO messages (name, message) VALUES (?, ?)`, [name, message])
    } else {
      req.session.error = 'Name or content cannot be empty!'
    }
  } catch (e) {
     console.error('Failed to create entry in the db', e);
     res.status(500).end();
  }
  res.redirect('/')
})

// Runner
app.listen(process.env.APP_PORT, () => {
  console.log(`App listening on port ${process.env.APP_PORT}`);
});