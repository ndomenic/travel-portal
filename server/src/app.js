const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db-config');
const bodyParser = require('body-parser');
var fs = require('fs');
var busboy = require('connect-busboy');

const serverDir = __dirname.substring(0, __dirname.length - 3)

//Setup the express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(busboy());
app.use(express.static(serverDir + "build"));

const pool = db.pool;

const fileDir = serverDir + "files";

app.post('/uploadData' , (req, res) => {
	let name = req.body["name"];
	let numFiles = req.body["numFiles"];
	let description = req.body["description"];
	let location = req.body["location"];

	pool.getConnection(function(err, connection) {
		connection.query('INSERT INTO images(name, numFiles, description, location) VALUES ("' + name + '",' + numFiles + ',"' + description + '","' + location + '")', function (err, rows, fields) {
			connection.query('SELECT * FROM images', function (err, rows, fields) {
		        connection.release();
		        if (err) throw err
		        res.json({"id": rows[rows.length-1]["id"]});
		        console.log(rows[rows.length-1]["id"]);
		    });
			if (err) throw err
		});
	});
});

console.log(serverDir)

app.post('/uploadPicture', (req, res) => {
	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
    	var dataArr = fieldname.split(',');
    	var name = dataArr[0];
    	var id = dataArr[1];

    	var nameDir = fileDir + "/" + name;
    	if (!fs.existsSync(nameDir)){
		    fs.mkdirSync(nameDir);
		}

		var idDir = nameDir + "/" + id;
		if (!fs.existsSync(idDir)){
		    fs.mkdirSync(idDir);
		}

		var fstream = fs.createWriteStream(idDir + "/" + filename);
		file.pipe(fstream);
        fstream.on('close', function () {
            res.json({"ok": filename})
        });
    });
});

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
    res.sendFile(path.join(serverDir+'build/index.html'));
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