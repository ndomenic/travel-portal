const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db-config');
const pool = db.pool;
const bodyParser = require('body-parser');
var fs = require('fs');
var busboy = require('connect-busboy');

//Directory constants
const serverDir = __dirname.substring(0, __dirname.length - 3)
const fileDir = serverDir + "files";

//Setup the express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(busboy());
app.use(express.static(serverDir + "build"));

app.post('/uploadData' , (req, res) => {
	//Get the data from the request body
	let name = req.body["name"];
	let numFiles = req.body["numFiles"];
	let description = req.body["description"];
	let location = req.body["location"];

	pool.getConnection(function(err, connection) {
		//Insert the data into the images table
		connection.query('INSERT INTO images(name, numFiles, description, location) VALUES ("' + name + '",' + numFiles + ',"' + description + '","' + location + '")', function (err, rows, fields) {
			if (err) throw err

			//Get the most recent row's id from the images table and return it to the requester
			connection.query('SELECT * FROM images', function (err, rows, fields) {
		        connection.release();
		        if (err) throw err
		        res.json({"id": rows[rows.length-1]["id"]});
		    });
		});
	});
});

app.post('/uploadPicture', (req, res) => {
	//Use busboy to handle files and file writing
    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {
    	//Get the data of the folder which was determined by the /uploadData endpoint
    	var dataArr = fieldname.split(',');
    	var name = dataArr[0];
    	var id = dataArr[1];

    	//Create a directory for the user's name if it doesn't exist
    	var nameDir = fileDir + "/" + name;
    	if (!fs.existsSync(nameDir)){
		    fs.mkdirSync(nameDir);
		}

		//Create a directory for the id of the image
		var idDir = nameDir + "/" + id;
		if (!fs.existsSync(idDir)){
		    fs.mkdirSync(idDir);
		}

		//Write the image to the new directory and send an okay response
		var fstream = fs.createWriteStream(idDir + "/" + filename);
		file.pipe(fstream);
        fstream.on('close', function () {
            res.json({"ok": filename})
        });
    });
});

//Serve the static page if the user doesn't hit any of the other endpoints
app.get('*', (req,res) =>{
    res.sendFile(path.join(serverDir+'build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port).on('error', function(err){
    console.log('An error occurred!');
    console.log(err);
});

process.on('uncaughtException', function(err) {
    console.log('process.on handler');
    console.log(err);
});

console.log('App is listening on port ' + port);