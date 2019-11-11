const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const { Pool } = require('pg');

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
      .query('SELECT markdown FROM mark')
      .then(res => console.table(res.rows[0]))
      .catch(e => console.error(e.stack))
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ text: `hello ${res.rows}` }));
});

app.listen(port, () =>
    console.log(`Express server is running on ${port}`)
);
