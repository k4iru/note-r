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

app.get('/api/greeting', (req, res) => {
    client
        .query('SELECT markdown FROM mark')
        .then(result => {
            console.table(result.rows[0].markdown)
            res.send(JSON.stringify({ text: result.rows[0].markdown }));
        })
        .catch(e => console.error(e.stack))
});

app.listen(port, () =>
    console.log(`Express server is running on ${port}`)
);
