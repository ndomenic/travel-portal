const mysql = require('mysql')

//Set up the connection to the database
const pool = mysql.createPool({
  host     : 'db',
  user     : 'user',
  password : 'password',
  database : 'db'
});

pool.getConnection(function(err, connection) {
	connection.query('SELECT * FROM test', function(err, rows, fields) {
		if (rows.length == 0) {
			connection.query('INSERT INTO test(str) VALUES ("Hello, world!")', function (err, rows, fields) {
			  connection.release();
			  if (err) throw err
			});
		}
	});
});

//Set up dummy data
pool.getConnection(function(err, connection) {
	connection.query('CREATE TABLE IF NOT EXISTS test( \
		id INT AUTO_INCREMENT, \
		str VARCHAR(20), \
		PRIMARY KEY (id)\
		)', function (err, rows, fields) {
			connection.release();
	  		if (err) throw err
	});
});

//Export the connection
exports.pool = pool;