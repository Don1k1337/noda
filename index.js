// .env config read
const dotenv = require('dotenv');
dotenv.config();
// express init
const express = require('express');
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
// reader init
const fs = require('fs')
const messages = JSON.parse(fs.readFileSync('./data/messages.json', 'utf8'))

app.get('/', (req, res) => {
  res.render('index', { messages, session: req.session })
});

app.post('/message/create', (req, res) => {
  const body = req.body
  const name = body.name
  const message = body.message
  if (name && message) {
    messages.push({name, message})
    fs.writeFileSync('./data/messages.json', JSON.stringify(messages))
  } else {
    req.session.error = 'Name or content cannot be empty!'
  }
  res.redirect('/')
})

app.listen(1024, () => {
  console.log('App listening on port 3000!');
});
