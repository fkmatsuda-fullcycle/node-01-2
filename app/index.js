const express = require('express')
const app = express()

const port = 3000

const config = {
    host: 'db',
    user: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.use(express.urlencoded({ extended: true }))
app.get('/', index)
app.post('/', postPeople)

app.listen(port, () => console.log(`App listening on port ${port}!`))

function index(req, res) {
    const sql = 'select * from people'
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(`error: ${err}`)
        } else {

            let html = '<h1>Full Cycle Rocks!</h1><h2>People</h2><ul>'

            results.forEach(result => {
                html += `<li>${result.name}</li>`
            })

            html += '</ul><div>' +
                '<h2>Add a new person</h2>' +
                '<form method="post">' +
                '<input type="text" name="name" placeholder="name">' +
                '<button type="submit">Add</button>' +
                '</form></div>'
            res.send(html)
        }
    })
}

function postPeople(req, res) {
    const { name } = req.body
    const sql = `insert into people (name) values ('${name}')`
    connection.query(sql)
    index(req, res)
}