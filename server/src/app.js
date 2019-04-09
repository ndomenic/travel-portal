const express = require('express');
const path = require('path');
const cors = require('cors')

const buildDir = __dirname.substring(0, __dirname.length - 10) + 'client/build'

const app = express();

// Use cors options to availbe cross-origin errors
app.use(cors());

// Serve the static files from the React app
app.use(express.static(buildDir));

// An api endpoint that returns a short list of items
app.get('/helloWorld', (req,res) => {
	console.log("test");
    res.json({"foo": "bar"});
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(buildDir+'/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);