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

// allows resource sharing 
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// apply HTTP headers 
app.use(helmet());
app.use(cors(corsOptions))


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
        const results = await client.query('SELECT markdown from mark');
        console.table(results);
        return results.rows;
    }
    catch(e){
        return [];
    }
}

app.get("/api/read", async (req, res) => {
    const rows = await readMark();
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({rows}));

})

app.listen(port, () =>
    console.log(`Express server is running on ${port}`)
);
