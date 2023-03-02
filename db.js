/*
   db.js
   This is the main file for initialization of connection
   between server & database. It uses it utility method .promisify for creating
   a Promise like and async behavior to avoid a callback hell
*/
const util = require('util');
const mysql = require('mysql')
const { db } = require('./config')

const dbConnection = mysql.createConnection(db)
const query = util.promisify(dbConnection.query).bind(dbConnection)

module.exports = {
    dbConnection,
    query
}
