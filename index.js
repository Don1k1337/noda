const express = require('express');
const app = express();
const messages = []

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index', { messages })
});

app.post('/message/create', (req, res) => {
  const body = req.body
  const name = body.name
  const message = body.message
  if (name && message) {
    messages.push({name, message})
  }
  res.redirect('/')
})

app.listen(1024, () => {
  console.log('App listening on port 3000!');
});
