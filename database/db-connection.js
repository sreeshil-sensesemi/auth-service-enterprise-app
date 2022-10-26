const sql = require('mysql2')

const db = sql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    port: process.env.DB_PORT
    
})

module.exports = db;