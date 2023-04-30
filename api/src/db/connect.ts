
const mysql = require("mysql")
const connection = async () => {
    return await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'rootpassword',
        database: 'event'
    })
}
module.exports = connection
