var mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'ronan841',
		database: 'react'
	});
}

module.exports = function() {
	return createDBConnection;
}