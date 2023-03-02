const express = require('express');
const config = require('./config');
const { query } = require('./db');

const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const session = require('express-session');
app.use(session(config.session))

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
            await query('INSERT INTO messages (name, message) VALUES (?, ?)', [name, message])
        } else {
            req.session.error = 'Name or content cannot be empty!'
        }
    } catch (e) {
        console.error('Failed to create entry in the db', e);
        res.status(500).end();
    }
    res.redirect('/')
})

module.exports = app;