const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db-config');

const buildDir = __dirname.substring(0, __dirname.length - 3) + 'build'

//Setup the express app
const app = express();
app.use(cors());
app.use(express.static(buildDir));

const conn = db.connection;

app.get('/getAllFromDB', (req,res) => {
	console.log("Hit endpoint /getAllFromDB");
	conn.query('SELECT * FROM test', function (err, rows, fields) {
		if (err) throw err
		res.json({"rows": rows});
	});
});

app.post('/addToDB', (req,res) => {
	console.log("Hit endpoint /addToDB");
	conn.query('INSERT INTO test(str) VALUES ("Hello, world!")', function (err, rows, fields) {
		if (err) throw err
	});
});

app.post('/deleteAllFromDB', (req,res) => {
	console.log("Hit endpoint /deleteAllFromDB");
	conn.query('DELETE FROM test', function (err, rows, fields) {
		if (err) throw err
	});
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	console.log("Hit endpoint /*");
    res.sendFile(path.join(buildDir+'/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);