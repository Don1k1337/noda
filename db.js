const util = require('util');
const mysql = require('mysql')
const { db } = require('./config')

const dbConnection = mysql.createConnection(db)
const query = util.promisify(dbConnection.query).bind(dbConnection)

module.exports = {
    dbConnection,
    query
}
