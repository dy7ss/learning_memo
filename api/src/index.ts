import express, { Application, Request, Response } from 'express'

const app: Application = express()
const PORT = 3000

let db_con;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mysql = require("mysql")


// functions

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
        db_con.query(query, params, (err, rows, fields) => {
            if (err) {
                reject(err)
            } else {
                console.log('The solution is: ', rows)
                resolve(rows)
            }
        })
    })
}

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

// routing
app.get('/db_show', async (_req: Request, res: Response) => {

    const query = "SELECT * FROM learning_list;"
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, [])) as any[]
    } catch (err) {
        console.log(err)
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.send(con_res)

})

app.get('/db_insert', async (_req: Request, res: Response) => {

    const query = "INSERT INTO learning_list(subject_name, used_time) VALUES(?, ?)"
    const params = ["LPIC", 12] as any[];
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, params)) as any[]
    } catch (err) {
        console.log(err)
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.send(con_res)
})

app.get('/db_insert2', async (req: Request, res: Response) => {

    const subject_name = req.query.subject_name;
    const used_time = req.query.used_time

    const query = "INSERT INTO learning_list(subject_name, used_time) VALUES(?, ?)"
    const params = [subject_name, used_time] as any[];
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, params)) as any[]
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
        con_res = (await db_query(query, params)) as any[]
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


start()
