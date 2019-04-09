const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db-config');

const buildDir = __dirname.substring(0, __dirname.length - 10) + 'client/build'

//Setup the express app
const app = express();
app.use(cors());
app.use(express.static(buildDir));

const conn = db.connection;

// An api endpoint that returns a short list of items
app.get('/helloWorld', (req,res) => {
	conn.query('SELECT * FROM test WHERE id=1', function (err, rows, fields) {
		if (err) throw err
		res.json({"test": rows[0]["str"]});
	});
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(buildDir+'/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);