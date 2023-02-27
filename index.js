const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const session = require("express-session");
const app = express();
const messages = []

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { messages, session: req.session })
});

app.post('/message/create', (req, res) => {
  const body = req.body
  const name = body.name
  const message = body.message
  if (name && message) {
    messages.push({name, message})
  } else {
    req.session.error = 'Name or content cannot be empty!'
  }
  res.redirect('/')
})

app.listen(1024, () => {
  console.log('App listening on port 3000!');
});
