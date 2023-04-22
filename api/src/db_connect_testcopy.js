const mysql = require("mysql")
const connection = mysql.createConnection({
    // host: 'localhost',
    host: '172.19.0.3',
    user: 'root',
    password: 'rootpassword',
    database: 'event'
})

connection.connect()

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
connection.query('SELECT * FROM mail', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows)
})

connection.end()
