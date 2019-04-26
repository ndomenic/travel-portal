const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db-config');
const pool = db.pool;
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const session = require('express-session')
var fs = require('fs');
var busboy = require('connect-busboy');
const redis = require('redis');
const redisClient = redis.createClient({host: 'redis'});
const redisStore = require('connect-redis')(session);

//Directory constants
const serverDir = __dirname.substring(0, __dirname.length - 3)
const fileDir = serverDir + "files";

//Setup the express app
const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://domenichini.ca:8080'];
app.use(cors({
	credentials: true,
	origin: function(origin, callback){
		if(!origin) return callback(null, true);
		if(allowedOrigins.indexOf(origin) === -1){
		  var msg = 'The CORS policy for this site does not ' +
		            'allow access from the specified Origin.';
		  return callback(new Error(msg), false);
		}
		return callback(null, true);
	}
}));
app.use(bodyParser.json());
app.use(busboy());
app.use(express.static(serverDir + "build"));
app.use(session({
	secret: uuidv4(),
	name: '_travelPortal',
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false},
	store: new redisStore({host: 'localhost', port: 6379, client: redisClient, ttl: 86400})
}));

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

app.get('/testSession', (req, res) => {
	if(req.session.page_views){
      req.session.page_views++;
    } else {
      req.session.page_views = 1;
    }
    res.json({"num": req.session.page_views})
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

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

console.log('App is listening on port ' + port);