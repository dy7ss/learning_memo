const mysql = require("mysql")
const connection = mysql.createConnection({
    // host: 'localhost',
    // host: '172.19.0.3',
    host: 'db',
    user: 'root',
    password: 'rootpassword',
    database: 'event'
})

connection.connect()


const insert_query: string = 'insert into mail (sent_to, subject, body, sent_at, result) values ("sen2", "sub2", "body2", "sent_at2", "b");'
const select_query: string = 'SELECT * FROM mail'

connection.query(select_query, (err: string, result: []) => {
    if (err) throw err

    console.log('The solution is: ', result)
})

connection.query(insert_query, (err: string, result: []) => {
    if (err) throw err
    console.log('The solution is: ', result)
})

connection.query(select_query, (err: string, result: []) => {
    if (err) throw err

    console.log('The solution is: ', result)
})

connection.end()

