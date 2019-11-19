const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = 5000;
const { Pool } = require('pg');
const showdown = require('showdown');

// client connection
// TODO migrate over to dotenv
const client = new Pool({
    user: 'kyle',
    host: 'localhost',
    database: 'api',
    password: '',
    port: 5432,
})

const app = express();
app.use(express.json());

// apply HTTP headers 
app.use(helmet());
// allows resource sharing 
app.use(cors())


connect();
async function connect() {
    try {
        await client.connect();
    }
    catch(e) {
        console.error(`Failed to connect ${e}`);
    }
}

// retrieve document
async function readMark() {
    try {
        const result = await client.query('SELECT markdown from mark');
        console.table(result);
        return result.rows;
    }
    catch(e){
        return [];
    }
}

// update document 
async function update(data) {
    try {
        const result = await client.query(`UPDATE mark SET markdown = '${data}'`);
        return result.rows;
    }
    catch(e){
        return e;
    }
}

// save new document
async function store_doc(data) {
    try {
        const query_text = 
            "INSERT INTO documents (markdown_content) VALUES (?) RETURNING id"
        const result = await client.query(query_text, data);
        const stored_id = result.fetchone()[0];
    }
    catch(e) {
    }
}
// convert document 
async function compile_doc(data) {
    try {

        let test ='# hellom markdown!'
        const converter = new showdown.Converter();
        const html = converter.makeHtml(data || test);
        console.log(html);
        return html;
    }
    catch(e) {
        return e;
    }
}
app.get("/api/read", async (req, res) => {
    const rows = await readMark();
    res.setHeader("Content-type", "application/json");
    res.send(JSON.stringify({rows}));

})

app.post("/api/update", async (req, res) => {
    console.log(req.body.text);
    const result = await update(req.body.text);
    let test = '# hello markdown!'
    const test_result = await compile_doc(test);

})

app.listen(port, () =>
    console.log(`Express server is running on ${port}`)
);
