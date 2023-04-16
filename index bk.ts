import express, { Application, Request, Response } from 'express'
import { nextTick } from 'node:process'
import { afterEach } from 'node:test'


const app: Application = express()
const PORT = 3000


const db_connection = () => {
    return new Promise((resolve, reject) => {

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

        let send_res;

        connection.query(select_query, function (err: string, result: []) {
            if (err) throw err
            console.log("result", result)
            send_res = result
        })

        connection.end()

        console.log("send_res", send_res)
        resolve(send_res);
    })

}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'));
app.use('/static', express.static('public'));

app.get('/', async (_req: Request, res: Response) => {
    return res.status(200).send({
        message: 'Hello World!',
    })
})

app.get('/main2', async (_req: Request, res: Response) => {
    // return res.status(200).send({
    //     message: 'Hello World!',
    //     message2: "good evening",
    // })
    const result_tes = { "hoge": "foo" }
    res.json(result_tes)
})

app.get('/db', async (_req: Request, res: Response) => {

    db_connection().then((connection) => {
        // return "aaa"
        return connection
    })
        .then(function (rows) {
            res.send(rows)
        })

    // const result = await db_connection();
    // res.json(result)

    // try {
    //     const result = await db_conn()
    //     console.log("db", result)
    //     res.json(result)
    // } catch (error) {
    //     console.log(error)
    // }


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
