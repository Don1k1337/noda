/*
   config.js
   This is the main file for the server-side configurations.
   It uses .env variables with defined names for db, session
*/
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
    },
    session: {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    },
    appPort: process.env.APP_PORT
};