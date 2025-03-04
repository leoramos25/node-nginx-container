const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodenginxdb',
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get("/", async (req, res) => {
    insert();
    select(res);
});

function insert() {
    var name = `John Doe${Math.random().toFixed(1) * 10}`
    connection.query(`INSERT INTO people(name) VALUES('${name}')`);
}

function select(res) {
    connection.query("SELECT * FROM people", (error, results) => {
        if (error) {
            throw new Error("Error to search peoples")
        }
        const rows = results.map(person =>
            `<tr>
                <td>${person.id}</td>
                <td>${person.name}</td>
            </tr>`
        ).join('');
        var table = `
        <h1>Full Cycle Rocks!</h1>

        <table>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
            ${rows}
        </table>`
        res.send(table);
    });
}

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})