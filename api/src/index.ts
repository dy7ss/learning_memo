import express, { Application, Request, Response } from 'express'

const app: Application = express()
const PORT = 3000

let db_con;
const cors = require('cors');

// TODO IPアドレスを記入する
app.use(cors())

const { body, validationResult } = require('express-validator');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mysql = require("mysql")
const connection = require("./db/connect")
const validator = require("./util/validator")

// functions
const db_query = require("./db/query")

// routing
app.get('/db_show', async (_req: Request, res: Response) => {

    const query = "SELECT * FROM learning_list;"
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, [], db_con)) as any[]
    } catch (err) {
        console.log(err)
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.send(con_res)

})

app.get('/db_search', async (req: Request, res: Response) => {

    // 項目名
    const subject_name = req.query.subject_name;
    let query;
    // 項目名が設定されていないとき
    if (!subject_name) {
        query = "SELECT * FROM learning_list;"
    } else {
        // 項目名が設定されているとき
        query = "SELECT * FROM learning_list WHERE subject_name LIKE ?"
    }
    // 部分一致検索とするための処理
    const params = ["%" +subject_name + "%"]
    
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, params, db_con)) as any[]
    } catch (err) {
        console.log(err)
    }
    res.send(con_res)

})


app.post('/db_insert', [body("used_time").notEmpty(), body("subject_name").notEmpty()], async (req: Request, res: Response) => {

    // 項目名
    const subject_name = req.body.subject_name;
    // 学習時間
    const used_time = req.body.used_time

    let error_info: any = {
        has_error: false,
        columns: []
    }

    // 項目名が空のとき
    if (validator.isEmpty(subject_name)){
        error_info.has_error = true
        error_info.columns.push("subject_name")
    }

    // 学習時間が整数値でないとき
    if (!validator.isPositiveInteger(used_time)){
        error_info.has_error = true
        error_info.columns.push("used_time")
    }

    if (error_info.has_error) {
        return res.status(422).json({ errors: error_info.columns})
    }

    const query = "INSERT INTO learning_list(subject_name, used_time) VALUES(?, ?)"
    const params = [subject_name, used_time] as any[];
    let con_res: any[] = []
    try {
        con_res = (await db_query(query, params, db_con)) as any[]
    } catch (err) {
        console.log(err)
    }
    res.status(201).send("Created")
})

app.get('/db_insert/:task_name', async (req: Request, res: Response) => {
    console.log("hoge2")

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
