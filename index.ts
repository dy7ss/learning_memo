import express, { Application, Request, Response } from 'express'
import { getMaxListeners, nextTick } from 'node:process'
import { afterEach } from 'node:test'

const app: Application = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mysql = require("mysql")
const connection = async () => {
    return await mysql.createConnection({
        // host: 'localhost',
        // host: '172.19.0.3',
        host: 'db',
        user: 'root',
        password: 'rootpassword',
        database: 'event'
    })
}

app.get('/db', async (_req: Request, res: Response) => {

    connection()
        .then((connection) => {
            const result = connection.query("SELECT * FROM mail;");
            connection.end();
            console.log("result", result)
            return result;
        })
        .then(function (rows) {
            console.log(rows)
        })
})



try {
    app.listen(PORT, () => {
        console.log(`dev server running at: http://localhost:${PORT}/`)
    })
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message)
    }
}
