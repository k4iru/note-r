const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = 5000;
const { Pool } = require('pg');

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

async function update(data) {
    try {
        const result = await client.query(`UPDATE mark SET markdown = '${data}'`);
        return result.rows;
    }
    catch(e){
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
    res.send('hehe');

})

app.listen(port, () =>
    console.log(`Express server is running on ${port}`)
);
