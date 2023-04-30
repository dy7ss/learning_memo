import express, { Application, Request, Response } from 'express'

const app: Application = express()
const PORT = 3000

let db_con;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mysql = require("mysql")
const connection = require("./db/connect")

// functions
const db_query = require("./db/query")

// routing
app.get('/db_show', async (_req: Request, res: Response) => {

    const query = "SELECT * FROM todo;"
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, [], db_con)) as any[]
    } catch (err) {
        console.log(err)
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.send(con_res)

})

app.get('/db_insert', async (_req: Request, res: Response) => {

    const query = "INSERT INTO todo(task_name, is_done) VALUES(?, ?)"
    const params = ["1", false] as any[];
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, params, db_con)) as any[]

    } catch (err) {
        console.log(err)
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.send(con_res)
})

app.get('/db_insert/:task_name', async (req: Request, res: Response) => {

    const task_name: string = req.params.task_name
    const query = "INSERT INTO todo(task_name, is_done) VALUES(?, ?)"
    const params = [task_name, false] as any[];
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, params, db_con)) as any[]
    } catch (err) {
        console.log(err)
    }
    res.send(con_res)
})


app.get('/', async (_req: Request, res: Response) => {
    return res.status(200).send({
        message: 'Hello World!',
    })
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
