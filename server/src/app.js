const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db-config');

const buildDir = __dirname.substring(0, __dirname.length - 3) + 'build'

//Setup the express app
const app = express();
app.use(cors());
app.use(express.static(buildDir));

const pool = db.pool;

app.get('/getAllFromDB', (req,res) => {
	console.log("Hit endpoint /getAllFromDB");
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM test', function (err, rows, fields) {
			connection.release();
			if (err) throw err
			res.json({"rows": rows});
		});
	});
});

app.post('/addToDB', (req,res) => {
	console.log("Hit endpoint /addToDB");
	pool.getConnection(function(err, connection) {
		connection.query('INSERT INTO test(str) VALUES ("Hello, world!")', function (err, rows, fields) {
			connection.release();
			if (err) throw err
		});
	});
});

app.post('/deleteAllFromDB', (req,res) => {
	console.log("Hit endpoint /deleteAllFromDB");
	pool.getConnection(function(err, connection) {
		connection.query('DELETE FROM test', function (err, rows, fields) {
			connection.release();
			if (err) throw err
		});
	});
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	console.log("Hit endpoint /*");
    res.sendFile(path.join(buildDir+'/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port).on('error', function(err){
    console.log('An error occurred!');
    console.log(err);
});

process.on('uncaughtException', function(err) {
	//conn.end();
	//conn.connect();
    console.log('process.on handler');
    console.log(err);
});

console.log('App is listening on port ' + port);