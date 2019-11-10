const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'kyle',
    host: 'localhost',
    database: 'api',
    password: '',
    port: 5432,
})


const app = express();
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/api/greeting', (req, res) => {
    pool
        .query('SELECT NOW() as now')
        .then(res => console.log(res.row[0]))
        .catch(e => console.error(e.stack))
    //const name = req.query.name || 'World';
    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ greeting: `Hello ${name}! from the server` }));
});

app.listen(port, () =>
    console.log(`Express server is running on ${port}`)
);
