const express = require('express');
const path = require('path');

const buildDir = __dirname.substring(0, __dirname.length - 6) + 'client/build'

const app = express();

// Serve the static files from the React app
app.use(express.static(buildDir));

// An api endpoint that returns a short list of items
app.get('/helloWorld', (req,res) => {
    res.json({"foo": "bar"});
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(buildDir+'/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);