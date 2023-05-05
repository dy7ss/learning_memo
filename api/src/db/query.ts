const db_query = async function db_query(query: string, params: string[], db_con: any) {
    return new Promise((resolve, reject) => {
        db_con.query(query, params, (err, rows, fields) => {
            if (err) {
                reject(err)
            } else {
                // console.log('The solution is: ', rows)
                resolve(rows)
            }
        })
    })
}

module.exports = db_query
