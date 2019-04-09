const mysql = require('mysql')

//Set up the connection to the database
const connection = mysql.createConnection({
  host     : 'db',
  user     : 'user',
  password : 'password',
  database : 'db'
});

connection.connect();

//Set up dummy data
connection.query('CREATE TABLE IF NOT EXISTS test( \
	id INT AUTO_INCREMENT, \
	str VARCHAR(20), \
	PRIMARY KEY (id)\
	)', function (err, rows, fields) {
  		if (err) throw err

	  	connection.query('INSERT INTO test(str) VALUES ("Hello, world!")', function (err, rows, fields) {
		  if (err) throw err
		})
});

//Export the connection
exports.connection = connection;