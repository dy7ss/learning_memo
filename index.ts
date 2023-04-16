import express, { Application, Request, Response } from 'express'
import { getMaxListeners, nextTick } from 'node:process'
import { afterEach } from 'node:test'

const app: Application = express()
const PORT = 3000

let db_con;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mysql = require("mysql")
const connection = async () => {
    return await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'rootpassword',
        database: 'event'
    })
}


async function db_query(query: string, params: string[]) {
    return new Promise((resolve, reject) => {
        db_con.query(query, (err, rows, fields) => {
            if (err) {
                reject(err)
            } else {
                console.log('The solution is: ', rows)
                resolve(rows)
            }
        })
    })
}


app.get('/db', async (_req: Request, res: Response) => {

    const query = "SELECT * FROM mail;"
    // const con = await connection()
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, [])) as any[]
    } catch (err) {
        console.log(err)
    }



    console.log(con_res)
    res.send(con_res)
})


async function start() {
    try {
        db_con = await connection()
        app.listen(PORT, () => {
            console.log(`dev server running at: http://localhost:${PORT}/`)
        })
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)
        }
    }
}

start()
