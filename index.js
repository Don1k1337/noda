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
  promise: Promise
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
// db query
const query = util
    .promisify(db.query)
    .bind(db);

app.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM messages');
    res.render('index', { messages: rows, session: req.session });
  } catch (e) {
    console.log('Failed to load entries from db', e);
    res.status(500).end();
  }
});
app.post('/message/create', (req, res) => {
  const body = req.body
  const name = body.name
  const message = body.message
  if (name && message) {
    messages.push({name, message})
    // fs.writeFileSync('./data/messages.json', JSON.stringify(messages))
  } else {
    req.session.error = 'Name or content cannot be empty!'
  }
  res.redirect('/')
})

app.listen(process.env.APP_PORT, () => {
  console.log('App listening on port 3000!');
});
